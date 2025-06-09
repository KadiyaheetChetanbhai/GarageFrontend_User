import { ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Dropdown({
  options = [],
  defaultValue = null,
  onSelect,
  placeholder = "Select an option",
  className = "",
  buttonClassName = "",
  optionClassName = "",
  forcePortal = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [usePortal, setUsePortal] = useState(forcePortal);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Detect if we need portal based on container overflow
  useEffect(() => {
    if (buttonRef.current && !forcePortal) {
      const checkForOverflowParent = (element) => {
        let parent = element.parentElement;
        while (parent && parent !== document.body) {
          const styles = window.getComputedStyle(parent);
          if (
            styles.overflow === "hidden" ||
            styles.overflowY === "auto" ||
            styles.overflowY === "scroll" ||
            styles.overflowX === "auto" ||
            styles.overflowX === "scroll"
          ) {
            return true;
          }
          parent = parent.parentElement;
        }
        return false;
      };

      // Use portal if we detect problematic overflow containers
      setUsePortal(checkForOverflowParent(buttonRef.current));
    }
  }, [forcePortal]);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect && onSelect(option);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelected(null);
    onSelect && onSelect(null);
  };

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const handleToggle = () => {
    if (!isOpen && usePortal) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Update position on scroll/resize when using portal
  useEffect(() => {
    if (isOpen && usePortal) {
      const handleUpdate = () => updatePosition();
      window.addEventListener("scroll", handleUpdate, true);
      window.addEventListener("resize", handleUpdate);

      return () => {
        window.removeEventListener("scroll", handleUpdate, true);
        window.removeEventListener("resize", handleUpdate);
      };
    }
  }, [isOpen, usePortal]);

  // Update selected when defaultValue changes
  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  const dropdownContent = (
    <ul
      ref={dropdownRef}
      className={`mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto sm:max-h-64 ${
        usePortal ? "absolute" : "absolute left-0 right-0 z-50"
      }`}
      style={
        usePortal
          ? {
              top: position.top,
              left: position.left,
              minWidth: position.width,
              zIndex: 99999,
              maxWidth: "320px",
            }
          : {
              zIndex: 9999,
            }
      }
    >
      {options.length > 0 ? (
        options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleSelect(option)}
            className={`flex items-center gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer ${optionClassName}`}
          >
            {option.label}
          </li>
        ))
      ) : (
        <li className="px-4 py-2 text-gray-500">No options available</li>
      )}
    </ul>
  );

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className={`w-full flex items-center justify-between bg-white text-left hover:border-gray-400 focus:outline-none cursor-pointer ${buttonClassName}`}
      >
        <span className="truncate">
          {selected ? selected.label : placeholder}
        </span>

        {selected ? (
          <span
            className="text-gray-500 hover:text-red-500 ml-2 cursor-pointer flex-shrink-0"
            onClick={handleClear}
            title="Clear"
          >
            <X size={20} />
          </span>
        ) : (
          <span className="ml-2 flex-shrink-0">
            <ChevronDown size={20} />
          </span>
        )}
      </button>

      {isOpen &&
        (usePortal
          ? createPortal(dropdownContent, document.body)
          : dropdownContent)}
    </div>
  );
}
