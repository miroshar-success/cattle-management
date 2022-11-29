import React from "react";
import NavbarLink from "../NavBar/NavbarLink";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Login/LoginButton";
import LogoutButton from "../Logout/LogoutButton";

export default function Footer() {
  const { isLoading, isAuthenticated } = useAuth0();
  return (
    <footer aria-label="Site Footer" className="bg-gray-100  mt-5 md:mt-10">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
          <a
            className="inline-block rounded-full bg-green p-2 text-white shadow transition hover:bg-green sm:p-3 lg:p-4"
            href="#top"
          >
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className=" h-[80px] w-[100px] mx-auto">
              <img
                className="w-full h-full object-cover object-center"
                src="https://res.cloudinary.com/dfbxjt69z/image/upload/v1667061065/cattle/CAttle_tracker__1_-removebg-preview_qufnwk.png"
                alt="logo"
              />
            </div>
          </div>

          <nav ariaLabel="Footer Nav" className="mt-12 lg:mt-0">
            <div className="flex flex-wrap justify-center gap-3 md:gap-5 lg:justify-end lg:gap-8">
              <NavbarLink
                path="/team"
                text="Equipo"
                divStyle="border-transparent border-solid hover:bg-transparent hover:text-green hover:border-green  transition duration-300 self-center"
              />
              {!isLoading && isAuthenticated ? (
                <>
                  <NavbarLink
                    path="/home/management"
                    text="Administrar animales"
                    divStyle="border-transparent border-solid hover:bg-transparent hover:text-green hover:border-green  transition duration-300 self-center"
                  />
                  <NavbarLink
                    path="/home/statistics"
                    text="Dashboard"
                    divStyle="border-transparent border-solid hover:bg-transparent hover:text-green hover:border-green  transition duration-300 self-center"
                  />
                  <NavbarLink
                    path="/home/profile"
                    text="Perfil & Notas"
                    divStyle="border-transparent border-solid hover:bg-transparent hover:text-green hover:border-green  transition duration-300 self-center"
                  />

                  <div>
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  <LoginButton footer={true} />
                </>
              )}{" "}
            </div>
          </nav>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          My Cattle Log &copy; 2022. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
