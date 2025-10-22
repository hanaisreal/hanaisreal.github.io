import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return () => undefined;
    }

    if (window.matchMedia('(pointer: coarse)').matches) {
      return () => undefined;
    }

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  }, []);

  const cursorClasses = [
    'custom-cursor',
    visible ? 'is-visible' : '',
    isActive ? 'is-active' : '',
  ].join(' ');

  const ringClasses = [
    'custom-cursor-ring',
    visible ? 'is-visible' : '',
    isActive ? 'is-active' : '',
  ].join(' ');

  return (
    <>
      <div
        className={ringClasses}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
      <div
        className={cursorClasses}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
    </>
  );
};

export default CustomCursor;
