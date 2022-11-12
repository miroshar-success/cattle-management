import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAnimals,
  setUserAnimalsToLoading,
} from "../../redux/features/animals";
import loading from "../../assets/loading.gif";
// import { Pagination } from "../Pagination/Pagination";
import { PropsColumns } from "../PropsColumns/PropsColumns";

export function CardContainer(props) {
  const userAnimalsState = useSelector((state) => state.animals.userAnimals);
  const dispatch = useDispatch();
  const tokenAccess = localStorage.getItem("tokenCattleTracker");

  React.useEffect(() => {
    dispatch(setUserAnimalsToLoading());
    dispatch(getAllAnimals(tokenAccess));
  }, [dispatch, tokenAccess]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-green text-xl border-solid  border-b-2 border-green my-3 mx-3">
        Lista de animales
      </div>
      {userAnimalsState?.loading === true ? (
        <div>
          <img src={loading} alt="loading spinner" />
        </div>
      ) : null}
      {userAnimalsState?.length === 0 ? (
        <div>
          No tienes animales cargados en la base de datos. ¡Haz click en el
          botón "Agregar animal" para registrar tu primer animal en segundos!
        </div>
      ) : null}
      {Array.isArray(userAnimalsState) && userAnimalsState?.length > 0 ? (
        <div className="list-animals-grid">
          <PropsColumns animals={userAnimalsState} />{" "}
        </div>
      ) : null}
      {userAnimalsState.error ? (
        <div className="error-msg-div">
          Oops! Hubo un error. {userAnimalsState.error}
        </div>
      ) : null}
    </div>
  );
}
