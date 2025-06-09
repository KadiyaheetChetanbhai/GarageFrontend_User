import React from "react";
import logo from "../../assets/images/running-dog.gif";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-">
      <img src={logo} alt="loading..." />
    </div>
  );
}
