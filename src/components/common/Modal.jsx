import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  overlayClassName = "",
}) {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [animatingOut, setAnimatingOut] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimatingOut(false);
      document.body.style.overflow = "hidden";
    } else if (isVisible) {
      // Start fade out
      setAnimatingOut(true);
      document.body.style.overflow = "auto";
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setAnimatingOut(false);
      }, 300); // Match your animation duration (0.3s)

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close on outside click
  const handleClickOutside = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleClickOutside}
      className={`fixed inset-0 z-99 bg-black/70 flex justify-center items-center overflow-y-auto py-6 transition-opacity duration-300 ${
        animatingOut ? "opacity-0" : "opacity-100"
      } ${overlayClassName}`}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`bg-white rounded-3xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          animatingOut ? "animate-fadeOut" : "animate-fadeIn"
        } ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
