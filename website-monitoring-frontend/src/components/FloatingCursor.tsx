import React, { useEffect, useState } from 'react';

const FloatingCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);
    };

    const handleMouseStop = () => {
      setIsMouseMoving(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseStop);
    window.addEventListener('mouseenter', () => setIsMouseMoving(true));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseStop);
      window.removeEventListener('mouseenter', () => setIsMouseMoving(true));
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isMouseMoving ? 'cursor-active' : ''}`}
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
      }}
    ></div>
  );
};

export default FloatingCursor;
