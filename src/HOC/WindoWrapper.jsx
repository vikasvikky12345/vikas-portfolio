import React, { useRef } from 'react'
import useStore from '#store/window'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

// Register GSAP plugins
gsap.registerPlugin(Draggable);

const WindoWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if(!el || !isOpen) return;

      gsap.fromTo(el, {
        scale: 0.8,
        opacity: 0,
        y: 40
      },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.out"
        }
      )
    }, [isOpen])

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      const [instance] = Draggable.create(el, {
        type: "x,y",
        bounds: "body",
        trigger: el.querySelector("#window-header"),
        cursor: "grab",
        activeCursor: "grabbing"
      })
      return () => {
        instance.kill();
      }
    }, [isOpen])

    if (!isOpen) return null;

    return <section
      id={windowKey}
      ref={ref}
      style={{ zIndex}}
      className='absolute'>
      <Component {...props} />

    </section>

  }
  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`
  return Wrapped
}

export default WindoWrapper