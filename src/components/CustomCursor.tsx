import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let requestRef: number;
    let targetX = -100;
    let targetY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === "pointer";
      const isClickable = 
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" || 
        target.closest("a") !== null || 
        target.closest("button") !== null;

      setIsHovering(isPointer || isClickable);
    };

    const updatePosition = () => {
      setPosition((prev) => {
        // Fast follow for the inner dot, slightly slower for outer ring if done in CSS
        // Simply returning targetX/Y for immediate update since CSS smooths the outer ring
        return { x: targetX, y: targetY }; 
      });
      requestRef = requestAnimationFrame(updatePosition);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    
    requestRef = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  // Return nothing on server or touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[10000]"
        style={{
          transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0) scale(${isHovering ? 0 : 1})`,
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.15s ease-out, opacity 0.3s ease",
        }}
      />
      {/* Outer Glow Ring */}
      <div
        className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-primary rounded-full pointer-events-none z-[9999]"
        style={{
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) scale(${isHovering ? 1.5 : 1})`,
          backgroundColor: isHovering ? "hsl(var(--primary) / 0.1)" : "transparent",
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.25s ease-out, background-color 0.2s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
};

export default CustomCursor;
