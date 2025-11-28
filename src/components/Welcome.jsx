import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const FONT_WEIGHTS = {
    subTitle: { min: 100, max: 400, default: 200 },
    title: { min: 400, max: 900, default: 200 }
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, index) => (
        <span
            key={index}
            className={className}
            style={{
                fontVariationSettings: `'wght' ${baseWeight}`,
                fontWeight: baseWeight,
                display: 'inline-block',
                transition: 'none'
            }}
        >
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) {
        return;
    }

    console.log(`Setting up hover for ${type}`);

    const letters = container.querySelectorAll("span");
    const { min, max, default: baseWeight } = FONT_WEIGHTS[type];

    let rafId = null;
    let currentMouseX = 0;

    const animateLetters = (letter, weight, duration = 0.5) => {
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
        });
    };

    const updateLetters = () => {
        const { left } = container.getBoundingClientRect();

        letters.forEach((letter) => {
            const {left: l, width: w} = letter.getBoundingClientRect();
            const letterCenter = l - left + w / 2;
            const distance = Math.abs(currentMouseX - letterCenter);
            const intensity = Math.exp(-(distance ** 2) / 20000);
            const weight = min + (max - min) * intensity;

            animateLetters(letter, weight, 0.5);
        });
    };

    const handleMouseMove = (e) => {
        currentMouseX = e.clientX;

        if (rafId) {
            cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
            updateLetters();
            rafId = null;
        });
    };

    const handleMouseLeave = () => {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        letters.forEach((letter) => animateLetters(letter, baseWeight, 0.5));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current, "title");
        const subtitleCleanup = setupTextHover(subtitleRef.current, "subTitle");

        return () => {
            titleCleanup?.();
            subtitleCleanup?.();
        };
    }, []);

    return (
        <section id="welcome">
            <p ref={subtitleRef} style={{ cursor: 'default' }}>
                {renderText("Hey, I'm Vikas! welcome to my", "text-3xl font-georama", 100)}
            </p>
            <h1 ref={titleRef} className='mt-7' style={{ cursor: 'default' }}>
                {renderText("portfolio", 'text-9xl italic font-georama')}
            </h1>
            <div className='small-screen'>
                <p>This portfolio is designed for desktop/tablet screens only.</p>
            </div>
        </section>
    );
};

export default Welcome;
