import React from "react";

export default function ImgDetail({ img }) {
  return (
    <img
      src={
        img
          ? img
          : // "https://res.cloudinary.com/dfbxjt69z/image/upload/v1667154572/cattle/pexels-tobi-457447_n4w5ee.jpg"
            "https://i.pinimg.com/originals/dc/09/3f/dc093fda316f139d923c664e8a0d9c08.png"
      }
      className="w-full h-full object-cover "
      alt="..."
    />
  );
}
