import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TABS } from "../../constants";
import { pages } from "../../constants/index.js";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleTabChange(tab) {
    navigate(`/?tab=${tab}`);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <nav className="bg-inherit relative z-51">
      {/* Backdrop overlay positioned inside nav but below the content */}
      {isOpen && (
        <div
          className="fixed inset-0  backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className="max-w-full mx-auto px-[20px] py-[12px] sm:px-[72px] sm:py-[20px]">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center max-[1241px]:flex min-[1241px]:hidden relative z-51">
            <Link to={"/"}>
              <img
                src="/Pet_11_Logo.webp"
                alt="logo"
                className="w-[33px] h-[40px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden min-[1241px]:flex min-[1241px]:items-center min-[1241px]:gap-x-2">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center mr-7">
              <Link to={"/"}>
                <img
                  src="/Pet_11_Logo.webp"
                  alt="logo"
                  className="w-[40px] h-[47px]"
                />
              </Link>
            </div>

            {pages.map((page) => (
              <NavLink
                key={page.link}
                to={page.link}
                className={({ isActive }) =>
                  `text-[#0A0A0A] hover:text-[#0A0A0A] hover:font-semibold px-3 pt-2 font-normal text-[14px] transition-colors duration-200 ${
                    isActive && "font-semibold"
                  }`
                }
              >
                {page.title}
              </NavLink>
            ))}
          </div>

          {/* Button Navigation */}
          <div className="hidden min-[1241px]:flex min-[1241px]:items-center min-[1241px]:space-x-[5px]">
            {TABS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleTabChange(btn.id)}
                className={
                  "px-4 py-2 rounded font-normal text-[14px] cursor-pointer hover:bg-opacity-90 transition-colors duration-200 " +
                  btn.classNameForHeader
                }
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="max-[1241px]:flex min-[1241px]:hidden flex items-center z-51 relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center border-none bg-none p-2 rounded-md text-[#0A0A0A] hover:text-blue-800 hover:bg-gray-100 focus:outline-none transition-colors duration-200 relative z-51"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <span className="block h-6 w-6 text-2xl">✕</span>
              ) : (
                <span className="block h-6 w-6 text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - positioned above the backdrop */}
      {isOpen && (
        <div className="max-[1241px]:block min-[1241px]:hidden absolute w-full left-0 z-50">
          <div className="bg-white shadow-md rounded-b-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {pages.map((page) => (
                <NavLink
                  key={page.link}
                  to={page.link}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md text-base font-normal text-[#0A0A0A] ${
                      isActive && "font-semibold"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {page.title}
                </NavLink>
              ))}
              <div className="pt-4 grid grid-cols-1 min-[560px]:grid-cols-2 gap-3">
                {TABS.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => {
                      setIsOpen(false);
                      handleTabChange(btn.id);
                    }}
                    className={
                      "block w-full px-4 py-2 rounded font-normal text-center hover:bg-opacity-90 transition-colors duration-200 " +
                      btn.classNameForHeader
                    }
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
