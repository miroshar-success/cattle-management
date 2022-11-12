import React from "react";
import { useNavigate } from "react-router-dom";

export const GoHomeBtn = () => {
  const navigate = useNavigate();

  function navigateToHome() {
    navigate("/home");
  }

  return (
    <button
      className="bg-green px-8 py-2 text-white font-bold rounded-sm my-5 border border-transparent border-solid hover:bg-transparent hover:text-green  hover:border-green  transition duration-300 "
      onClick={navigateToHome}
    >
      Ir al Home
    </button>
  );
};
