import React from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackNavLink({ name = "", path = "", onClick }) {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const location = useLocation();

  const handleBack = () => {
    if (navigationType === "PUSH") {
      navigate(-1);
    } else {
      const currentPath = location.pathname;
      const fallbackPath =
        path || currentPath.substring(0, currentPath.lastIndexOf("/"));
      navigate(fallbackPath, { replace: true });
    }
  };

  return (
    <button
      onClick={onClick || handleBack}
      className="flex items-center gap-6   bg-transparent border-none cursor-pointer no-underline"
    >
      <div className="flex items-center">
        <ArrowLeft size={24} />
      </div>

      <div className="font-montserrat font-semibold mt-1 text-[20px]">
        {name}
      </div>
    </button>
  );
}
