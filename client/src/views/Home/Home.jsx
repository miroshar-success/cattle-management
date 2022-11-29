import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { NavBar } from "../../components/NavBar/NavBar";
import axios from "axios";
import { USER_EXISTS } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
//import icons:
import privateSecurityIcon from "../../assets/privateSecurityIcon.png";
import analyticsIcon from "../../assets/analyticsIcon.png";
import notepad1 from "../../assets/notepad-90.png";
import mongodbIcon2 from "../../assets/mongodb96.png";

export function Home() {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } =
    useAuth0();

  const navigate = useNavigate();

  React.useEffect(() => {}, [isLoading, isAuthenticated, navigate, user]);

  async function handleValidation(user, isAuthenticated) {
    try {
      const claims = await getAccessTokenSilently();
      localStorage.setItem("tokenCattleTracker", claims);
      if (isAuthenticated && user) {
        let existe = await axios.get(USER_EXISTS, {
          headers: {
            Authorization: `Bearer ${claims}`,
          },
        });
        if (existe.data.msg === false) {
          navigate("/register");
        }
      }
    } catch (error) {
      console.log(
        "Sucedió un error en al manejar la validación del usuario. ",
        error
      );
    }
  }

  if (!isLoading && isAuthenticated) {
    handleValidation(user, isAuthenticated);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />
      <div className="w-full mt-14 md:mt-0 h-52 md:h-96 bg-home bg-cover bg-center text-right flex flex-col justify-end px-5 py-3 md:py-8 items-end ">
        <p className="text-white text-2xl font-semibold font-sans [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] md:text-4xl">
          My Cattle Log{" "}
        </p>
        <p className="text-white md:text-2xl font-semibold [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] md:w-3/4">
          ¿Está utilizando papel y lápiz o Microsoft Excel? ¡Deje que My Cattle
          Log le ayude a organizar sus registros de ganado!
        </p>
      </div>
      <div className="flex flex-col  md:grid md:grid-cols-3 max-w-5xl mx-auto gap-3 md:my-28 items-start px-5 md:px-0 my-5">
        <div className=" flex flex-col items-center gap-3 md:h-52 w-full rounded-sm py-5 px-2  text-green hover:scale-[1.01] transition duration-500]">
          <div className="w-full h-16 md:h-20">
            <img
              className="w-full h-full object-contain object-center"
              src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1668785593/cattle/o_3_t7xk7s.png"
              alt=""
            />
          </div>
          <p className="text-2xl font-sans md:mb-3 md:text-3xl">
            Fácil de usar
          </p>
          <p className="text-center text-xl">
            ¿No eres experto en informática? No te preocupes, el programa es
            intuitivo y fácil de usar.
          </p>
        </div>
        <div className=" flex flex-col items-center gap-3 md:h-52 w-full rounded-sm py-5 px-2  text-green hover:scale-[1.01] transition duration-500]">
          <div className="w-full h-16 md:h-20">
            <img
              className="w-full h-full object-contain object-center"
              src={privateSecurityIcon}
              alt="Secure and private icon"
            />
          </div>
          <p className="text-2xl font-sans md:mb-3 md:text-3xl">
            Segura y privada
          </p>
          <p className="text-center text-xl">
            Sólo usted puede acceder a sus registros ingresando con su cuenta
            personal. Sus datos están protegidos.
          </p>
        </div>
        <div className="md:h-52 w-full rounded-sm py-5 px-2  text-green hover:scale-[1.01] transition-all duration-500] flex flex-col items-center gap-3 ">
          <div className="w-full h-16 md:h-20">
            <img
              className="w-full h-full object-contain object-center"
              src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1668785593/cattle/o_3_t7xk7s.png"
              alt=""
            />
          </div>
          <p className="text-2xl font-sans md:mb-3 md:text-3xl">Sin costo</p>
          <p className="text-center text-xl">
            ¡Es totalmente gratuito! No hay necesidad de pagar nada. ¡Comience a
            organizarse hoy!
          </p>
        </div>
      </div>

      <div className="flex flex-col  md:grid md:grid-cols-3 max-w-5xl mx-auto gap-3 md:my-28 items-start px-5 md:px-0 my-5">
        <div className="md:h-52 w-full rounded-sm py-5 px-2  text-green hover:scale-[1.01] transition-all duration-500] flex flex-col items-center gap-3 ">
          <div className="w-full h-16 md:h-20">
            <img
              className="w-full h-full object-contain object-center"
              src={mongodbIcon2}
              alt=""
            />
          </div>
          <p className="text-2xl font-sans md:mb-3 md:text-3xl">MongoDB</p>
          <p className="text-center text-xl">
            Usamos MongoDB, una de las más modernas y seguras base de datos del
            mercado.
          </p>
        </div>
        <div className="md:h-52 w-full rounded-sm py-5 px-2  text-green hover:scale-[1.01] transition-all duration-500] flex flex-col items-center gap-3 ">
          <div className="w-full h-16 md:h-20">
            <img
              className="w-full h-full object-contain object-center"
              src={analyticsIcon}
              alt=""
            />
          </div>
          <p className="text-2xl font-sans md:mb-3 md:text-3xl">Estadísticas</p>
          <p className="text-center text-xl">
            My Cattle Log le ayuda a visualizar sus registros mediante un
            dashboard con estadísticas relevantes de sus animales.
          </p>
        </div>
        <div className="md:h-52 w-full rounded-sm py-5 px-2  text-green hover:scale-[1.01] transition-all duration-500] flex flex-col items-center gap-3 ">
          <div className="w-full h-16 md:h-20">
            <img
              className="w-full h-full object-contain object-center"
              src={notepad1}
              alt=""
            />
          </div>
          <p className="text-2xl font-sans md:mb-3 md:text-3xl">
            Notas personales
          </p>
          <p className="text-center text-xl">
            Cree y guarde notas y recordatorios relacionadas a su actividad
            ganadera de forma práctica y simple, en un solo lugar.
          </p>
        </div>
      </div>
      <div className="w-full h-96  relative bg-home2 bg-center bg-cover flex items-end md:mt-60">
        <div className="h-full w-full bg-gray/30 absolute"></div>
        <div className="my-8 text-right w-full mx-8 z-10">
          <p className="text-white text-2xl font-semibold font-sans [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] md:text-4xl">
            Organizando y simplificando el trabajo
          </p>
          <p className="text-white md:text-2xl font-semibold [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)] ">
            Para la gestión de granjas y animales, una aplicación que lo ayuda a
            aumentar la productividad.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
