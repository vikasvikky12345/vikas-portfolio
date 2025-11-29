import React, { useRef, useEffect } from "react";

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const animateText = (element, minWeight, maxWeight, baseWeight) => {
      if (!element) return;

      const spans = Array.from(element.querySelectorAll("span"));
      if (spans.length === 0) return;

      let centers = [];
      let mouseX = 0;
      let mouseY = 0;
      let active = false;

      const recalc = () => {
        centers = spans.map((span) => {
          const r = span.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        });
      };

      // Delay so both subtitle and title layout fully before caching
      setTimeout(recalc, 50);
      window.addEventListener("resize", recalc);

      const update = () => {
        spans.forEach((span, i) => {
          const dx = mouseX - centers[i].x;
          const dy = mouseY - centers[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const influence = Math.exp(-(dist * dist) / 10000);
          const weight = baseWeight + (maxWeight - baseWeight) * influence;

          const finalW = Math.max(minWeight, Math.min(maxWeight, weight));
          span.style.fontVariationSettings = `'wght' ${finalW}`;
          span.style.fontWeight = finalW;
        });

        active = false;
      };

      const onMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!active) {
          active = true;
          requestAnimationFrame(update);
        }
      };

      const onLeave = () => {
        spans.forEach((s) => {
          s.style.fontWeight = baseWeight;
          s.style.fontVariationSettings = `'wght' ${baseWeight}`;
        });
      };

      element.addEventListener("mousemove", onMove);
      element.addEventListener("mouseleave", onLeave);

      return () => {
        window.removeEventListener("resize", recalc);
        element.removeEventListener("mousemove", onMove);
        element.removeEventListener("mouseleave", onLeave);
      };
    };

    const c1 = animateText(titleRef.current, 400, 900, 400);
    const c2 = animateText(subtitleRef.current, 100, 400, 100);

    return () => {
      if (c1) c1();
      if (c2) c2();
    };
  }, []);

  const renderText = (text, base) =>
    text.split("").map((c, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          fontVariationSettings: `'wght' ${base}`,
          fontWeight: base,
          transition: "font-weight .25s ease-out",
        }}
      >
        {c === " " ? "\u00A0" : c}
      </span>
    ));

  return (
    <section id="welcome">
      <p
        ref={subtitleRef}
        className="text-3xl font-inter mb-4"
        style={{
          cursor: "default",
          pointerEvents: "auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        {renderText("Hey, I'm Vikas! welcome to my", 100)}
      </p>

      <h1
        ref={titleRef}
        className="mt-7 text-9xl font-inter italic"
        style={{
          cursor: "default",
          pointerEvents: "auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        {renderText("portfolio", 400)}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
