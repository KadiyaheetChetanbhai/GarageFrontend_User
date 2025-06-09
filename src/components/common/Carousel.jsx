import React, { useEffect, useState, useRef } from "react";

export default function Carousel({ images }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const touchThreshold = 75; // Minimum distance for a swipe

  function goToSlide(index) {
    setActiveSlide(index);
  }

  // Auto-advance slide effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeSlide, images.length]);

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (images.length <= 1) return; // No swiping if only one image

    const distance = touchStart - touchEnd;

    // Determine swipe direction and handle edge cases
    if (Math.abs(distance) > touchThreshold) {
      if (distance > 0) {
        // Swipe left (next image)
        setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else {
        // Swipe right (previous image)
        setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    }

    // Reset touch points
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section>
      <div
        className="mb-4 relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[activeSlide]}
          alt={"image"}
          className="w-full h-[204px] md:h-80 object-cover rounded-2xl"
        />

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ${
                activeSlide === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:flex gap-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${
              activeSlide === index
                ? "ring-2 ring-offset-primary-black/10 rounded-2xl"
                : ""
            }`}
          >
            <img
              src={img}
              alt={`thumbnail ${index + 1}`}
              className="w-20 h-20 rounded-2xl object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
