import React from "react";
import LoginButton from "../../components/Login/LoginButton";
import { GoHomeBtn } from "../../components/GoHomeBtn/GoHomeBtn";

export function LandingPage() {
  return (
    <div className=" w-full h-full p-5 min-h-screen flex items-center bg-landing bg-cover bg-center">
      <div className="bg-white/80 p-5 rounded-sm mx-auto max-w-3xl md:px-12 flex flex-col items-center gap-3">
        <div className="w-1/2 h-[180px] sm:w-[300px] mx-auto">
          <img
            className="w-full h-full object-cover object-center"
            src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1667061065/cattle/CAttle_tracker__1_-removebg-preview_qufnwk.png"
            alt="logo"
          />
        </div>
        <h1 className="text-3xl text-center mb-5 font-semibold md:text-4xl uppercase">
          Bienvenido a My Cattle Log
        </h1>
        <h3 className="text-gray text-justify md:text-2xl">
          My Cattle Log es una nueva plataforma para la ganadería del futuro,
          que permite digitalizar el campo, donde podrás registrar tus animales,
          sus movimientos, y mucho más.
        </h3>
        <div>
          <span className="mx-4">
            <LoginButton />
          </span>{" "}
          <span className="mx-4">
            <GoHomeBtn />
          </span>
        </div>
      </div>
    </div>
  );
}
