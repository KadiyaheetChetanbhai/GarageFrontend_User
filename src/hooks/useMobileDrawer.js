import { useEffect, useRef, useState } from "react";

// Define the possible drawer positions
const positions = ["open", "middle", "closed"];

export default function useMobileDrawer() {
  const drawerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const dragging = useRef(false);

  const [position, setPosition] = useState("middle"); // "open" | "middle" | "closed"

  // Define drawer positions based on screen height
  const getTranslateY = (pos) => {
    const screenHeight = window.innerHeight;
    switch (pos) {
      case "open":
        // Changed to 60% of screen height (drawer takes 60% from bottom)
        return screenHeight * 0.4; // Top 40% of screen = map, 60% = drawer
      case "middle":
        return screenHeight * 0.6;
      case "closed":
        return screenHeight - 60;
      default:
        return screenHeight * 0.25;
    }
  };

  // Apply transform without animation
  const applyTranslate = (value) => {
    if (drawerRef.current) {
      drawerRef.current.style.transition = "none";
      drawerRef.current.style.transform = `translateY(${value}px)`;
    }
  };

  // Handle the start of dragging
  const handleDragStart = (e) => {
    if (window.innerWidth >= 768) return; // Don't handle on desktop

    // Prevent pull-to-refresh behavior
    if (e.cancelable) e.preventDefault();

    dragging.current = true;
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  // Cycle through drawer positions
  const toggleDrawerPosition = () => {
    const currentIndex = positions.indexOf(position);
    const nextIndex = (currentIndex + 1) % positions.length;
    const nextPosition = positions[nextIndex];
    setPosition(nextPosition);

    if (drawerRef.current) {
      drawerRef.current.style.transition = "transform 0.3s ease";
      drawerRef.current.style.transform = `translateY(${getTranslateY(
        nextPosition
      )}px)`;
    }
  };

  // Handle dragging movement
  const handleDragMove = (e) => {
    if (!dragging.current || !drawerRef.current || window.innerWidth >= 768)
      return;

    // Get current touch/mouse position
    currentY.current = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = currentY.current - startY.current;

    const baseTranslate = getTranslateY(position);
    let newTranslate = baseTranslate + delta;

    const screenHeight = window.innerHeight;

    // Ensure minimum translate doesn't go below the open position (40% screen height)
    const minTranslate = screenHeight * 0.4;
    if (newTranslate < minTranslate) {
      // Apply resistance when trying to drag beyond limit
      newTranslate = minTranslate + (newTranslate - minTranslate) * 0.2;
    }

    const maxTranslate = screenHeight - 50;
    newTranslate = Math.max(
      Math.min(newTranslate, maxTranslate),
      minTranslate * 0.95
    );

    applyTranslate(newTranslate);
  };

  // Handle the end of dragging
  const handleDragEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;

    const delta = currentY.current - startY.current;
    const threshold = 50;

    let newPosition = position;

    // Determine new position based on drag distance
    if (delta > threshold) {
      if (position === "open") newPosition = "middle";
      else if (position === "middle") newPosition = "closed";
    } else if (delta < -threshold) {
      if (position === "closed") newPosition = "middle";
      else if (position === "middle") newPosition = "open";
    }

    setPosition(newPosition);
  };

  // Set up event listeners for drag movements
  useEffect(() => {
    const handleMove = (e) => handleDragMove(e);
    const handleEnd = () => handleDragEnd();

    window.addEventListener("mousemove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [position]);

  // Apply animation when position changes
  useEffect(() => {
    if (drawerRef.current) {
      drawerRef.current.style.transition = "transform 0.3s ease";
      drawerRef.current.style.transform = `translateY(${getTranslateY(
        position
      )}px)`;
    }
  }, [position]);

  return {
    drawerRef,
    handleDragStart,
    toggleDrawerPosition,
    position,
  };
}
