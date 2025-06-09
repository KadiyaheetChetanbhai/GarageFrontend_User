import { ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function MultiSelect({
  label = "",
  options = [],
  defaultValue = [],
  onSelect,
  placeholder = "Select options",
  className = "",
  buttonClassName = "",
  optionClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    const exists = selected.find((item) => item.value === option.value);
    let updated;
    if (exists) {
      updated = selected.filter((item) => item.value !== option.value);
    } else {
      updated = [...selected, option];
    }
    setSelected(updated);
    onSelect && onSelect(updated);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelected([]);
    onSelect && onSelect([]);
  };

  const isSelected = (option) =>
    selected.some((item) => item.value === option.value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-white border rounded-md hover:border-gray-400 focus:outline-none cursor-pointer ${buttonClassName}`}
      >
        <span className="truncate flex-1 text-left">
          {selected.length > 0 ? `${selected.length} selected` : placeholder}
        </span>

        {selected.length > 0 ? (
          <span
            className="text-gray-500 hover:text-red-500 ml-2 cursor-pointer"
            onClick={handleClear}
            title="Clear"
          >
            <X size={20} />
          </span>
        ) : (
          <span className="ml-2">
            <ChevronDown size={20} />
          </span>
        )}
      </button>

      {isOpen && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto sm:max-h-64">
          {options.length > 0 ? (
            options.map((option) => (
              <li
                key={option.value}
                className={`flex items-center gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer ${optionClassName}`}
                onClick={() => toggleOption(option)}
              >
                <input type="checkbox" checked={isSelected(option)} readOnly />
                <span>{option.label}</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
}
