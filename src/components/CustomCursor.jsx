import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Springs for smooth movement of the outer ring
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, input, select, textarea, .interactive-hover, [role="button"]'
      );

      // Only update state if it actually changed to avoid unnecessary re-renders
      setHovered(prev => {
        const next = !!isInteractive;
        return prev !== next ? next : prev;
      });
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Outer Spring Ring */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 rounded-full border-2 border-accent-gold"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 1.6 : 1,
          backgroundColor: hovered ? 'rgba(212, 175, 55, 0.15)' : 'rgba(0, 0, 0, 0)',
          borderColor: hovered ? '#F3E5AB' : '#D4AF37',
          boxShadow: hovered ? '0 0 15px rgba(212, 175, 55, 0.4)' : '0 0 0px rgba(0, 0, 0, 0)',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-accent-gold"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};

export default CustomCursor;
