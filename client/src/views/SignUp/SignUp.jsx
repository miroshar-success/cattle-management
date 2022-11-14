import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { header } from "../../constants/token";
import axios from "axios";
import { REGISTER_NEW_USER } from "../../constants/urls";

export const SignUp = () => {
  const tokenAccess = localStorage.getItem("tokenCattleTracker");
  const { user } = useAuth0();

  const navegar = useNavigate();
  // INPUT STATE:
  const [input, setInput] = useState({
    name: "",
    email: `${user?.email}`,
  });
  console.log(input);
  const redirectToHome = () => {
    navegar("/home");
  };

  // WAS REGISTERED STATE :
  const [isRegistered, setIsRegistered] = useState({ pure: true });

  // HANDLE SUBMIT:
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        REGISTER_NEW_USER,
        input,
        header(tokenAccess)
      );
      console.log("response.status = ", response.status);
      if (response.status === 200 || response.status === 204) {
        setIsRegistered({ status: true });
      }
    } catch (error) {
      setIsRegistered({ error: error.response?.data?.error });
      console.log(`Error en handleSubmit de SignUp. ${error.message}`);
    }
  };

  // HANDLE CHANGE:
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  //VALIDATIONS:
  //...validaciones con JS

  return (
    <div className="flex flex-col items-center min-h-screen h-full max-w-7xl mx-auto">
      <div className="bg-landing bg-cover bg-center w-full h-52 flex items-center justify-center mb-8">
        <h1 className="text-white font-bold font-sans text-2xl text-center px-5 uppercase drop-shadow-2xl [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] md:text-3xl">
          Registrá tu usuario en My Cattle Log
        </h1>
      </div>
      <p className="text-gray  text-justify  md:text-xl w-[90%] md:w-1/2 ">
        Es tu primera vez acá, por lo que te pedimos que completes tu perfíl
        para continuar y acceder a todas las funcionalidades de la app!
      </p>{" "}
      <br />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center md:w-1/2 md:my-8"
      >
        <div className="flex items-center gap-3 mb-3 w-full">
          <label
            htmlFor="name"
            className="text-gray font-semibold w-[90px] md:w-[130px]  "
          >
            Nombre{" "}
          </label>
          <input
            className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full"
            type="text"
            name="name"
            value={input.name}
            placeholder="Nombre"
            minLength={1}
            maxLength={50}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-3 mb-3 w-full">
          <label
            htmlFor="email"
            className="text-gray font-semibold w-[90px] md:w-[130px]"
          >
            Email{" "}
          </label>
          <input
            className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full italic text-gray"
            type="email"
            value={input?.email}
            disabled={true}
            name="email"
          />
        </div>
        {isRegistered.pure && (
          <button
            type="submit"
            className="bg-green px-8 py-2 text-white font-bold rounded-sm my-5 border border-transparent border-solid hover:bg-transparent hover:text-green  hover:border-green  transition duration-300 "
          >
            Registrarme
          </button>
        )}
      </form>
      {isRegistered.error && (
        <div className="flex flex-col items-center md:w-1/2 md:my-0">
          Oops! Algo salió mal. {isRegistered.error}
        </div>
      )}
      {isRegistered.status && (
        <div className="flex flex-col items-center md:w-1/2 md:my-0">
          <h2>
            ¡Has sido registrado exitosamente! Esperamos que disfrutes de My
            Cattle Log y te sea de utilidad.
          </h2>

          <button
            className="bg-green px-8 py-2 text-white font-bold rounded-sm my-5 border border-transparent border-solid hover:bg-transparent hover:text-green  hover:border-green  transition duration-300 "
            onClick={redirectToHome}
          >
            Continuar al home
          </button>
        </div>
      )}
    </div>
  );
};
