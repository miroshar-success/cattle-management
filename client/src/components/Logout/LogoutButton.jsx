import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="pb-3 w-fit border-solid border-b-2 border-transparent hover:border-green ease-in-out  hover:text-green  hover:cursor-pointer transition-all duration-300 ">
      <button
        onClick={() => {
          localStorage.removeItem("tokenCattleTracker");
          logout({ returnTo: window.location.origin });
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default LogoutButton;
