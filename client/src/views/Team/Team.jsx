import React from "react";
import Footer from "../../components/Footer/Footer";
import { NavBar } from "../../components/NavBar/NavBar";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export const Team = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />
      <div className="flex justify-center my-8 w-full">
        <h1 className="text-4xl font-bold text-gray text-center">Our Team</h1>
      </div>
      <div className="flex flex-col md:flex-row md:justify-center gap-5 my-8">
        <div className="flex flex-col p-3 items-center gap-2">
          <div className="image overflow-hidden w-[280px] h-[280px] mx-auto md:h-[200px] md:w-[200px]">
            <img
              className="h-full w-full  mx-auto rounded-full object-cover"
              src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1664415162/mascotapps/1657244268655_ypgwtp.jpg"
              alt=""
            />
          </div>
          <h2 className="font-bold text-gray-700">Roberto Spinelli</h2>
          <p className="font-bold text-[#28B0A2]">Full Stack Developer</p>
          <div className="flex gap-3">
            <a
              target={"_blank"}
              href="https://www.linkedin.com/in/roberto-augusto-spinelli-alcalde-980740244/"
              className="text-gray-500"
            >
              <BsLinkedin />
            </a>
            <a
              target={"_blank"}
              href="https://github.com/RobTangle"
              className="text-gray-500"
            >
              <BsGithub />
            </a>
          </div>
        </div>
        <div className="flex flex-col p-3 items-center gap-2">
          <div className="image overflow-hidden w-[280px] h-[280px] mx-auto md:h-[200px] md:w-[200px]">
            <img
              className="h-full w-full  mx-auto rounded-full object-cover"
              src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1664415738/mascotapps/WhatsApp_Image_2022-09-13_at_17.52.23_xt5xmv.jpg"
              alt=""
            />
          </div>
          <h2 className="font-bold text-gray-700">Tamara Frazzetta</h2>
          <p className="font-bold text-[#28B0A2]">Full Stack Developer</p>
          <div className="flex gap-3">
            <a
              target={"_blank"}
              href="https://www.linkedin.com/in/tamara-frazzetta/"
              className="text-gray-500"
            >
              <BsLinkedin />
            </a>
            <a
              target={"_blank"}
              href="https://github.com/tamaraantonella"
              className="text-gray-500"
            >
              <BsGithub />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
