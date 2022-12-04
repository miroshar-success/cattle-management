import React from "react";
import { PropsPregnantStatistics } from "../PropsColumns/PropsPregnantStatistics";

export function CardFilterContainer({ animalsToRender }) {
  return (
    <div className="max-w-7xl mx-auto border-solid border-b-2 border-green">
      <div className="text-green text-xl border-solid  border-b-2 border-green my-3 mx-3">
        Lista de animales filtrados
      </div>
      {animalsToRender?.length === 0 ? (
        <div>No hay ningún animal para mostrar </div>
      ) : null}
      {Array.isArray(animalsToRender) ? (
        <div className="list-animals-grid">
          <PropsPregnantStatistics animals={animalsToRender} />{" "}
        </div>
      ) : null}
      {animalsToRender?.error ? (
        <div className="error-msg-div">
          Oops! Hubo un error. Vuelve a intentarlo.
        </div>
      ) : null}
      <br />
    </div>
  );
}
