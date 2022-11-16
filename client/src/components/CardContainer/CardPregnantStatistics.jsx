import React from "react";
import { useState } from "react";
import { URL } from "../../constants/urls";
import axios from "axios";
import { header } from "../../constants/token";
import { PropsPregnantStatistics } from "../PropsColumns/PropsPregnantStatistics";

export function CardPregnantStatistics({ animalsToRender }) {
  const tokenAccess = localStorage.getItem("tokenCattleTracker");
  const [pregnant, setPregnant] = useState("");
  React.useEffect(() => {
    console.log(`en el useEffect de CardPregnantStatistics`);

    async function getPregnantAnimals(token) {
      const response = await axios.get(URL + "animal/pregnant", header(token));
      console.log(response.data);
      setPregnant(response.data);
    }
    getPregnantAnimals(tokenAccess);
  }, [tokenAccess]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-green text-xl border-solid  border-b-2 border-green my-3 mx-3">
        Lista de hembras preñadas
      </div>
      {pregnant?.rows?.length === 0 ? (
        <div>No hay ningún animal para mostrar </div>
      ) : null}
      {Array.isArray(pregnant?.rows) ? (
        <div className="rows-animals-grid">
          <PropsPregnantStatistics animals={pregnant.rows} />{" "}
        </div>
      ) : null}
      {pregnant.error ? (
        <div className="error-msg-div">
          Oops! Hubo un error. {pregnant.error}
        </div>
      ) : null}
    </div>
  );
}
