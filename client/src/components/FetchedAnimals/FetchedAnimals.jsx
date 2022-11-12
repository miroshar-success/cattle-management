import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimalCard } from "../AnimalCard/AnimalCard";
import { PropsColumns } from "../PropsColumns/PropsColumns";
import loading from "../../assets/loading.gif";
import { useEffect } from "react";
import { getAllAnimals } from "../../redux/actions/actions";

export function FetchedAnimals() {
  const fetchedAnimalsState = useSelector(
    (state) => state.animals.fetchedAnimals
  );
  const dispatch = useDispatch();
  const token = localStorage.getItem("tokenCattleTracker");

  useEffect(() => {
    dispatch(getAllAnimals(token));
  }, [dispatch, token]);
  return (
    <div>
      {fetchedAnimalsState?.status?.pure && null}
      {fetchedAnimalsState.status?.fetched &&
      fetchedAnimalsState.result.length === 0 ? (
        <div>No se encontraron coincidencias</div>
      ) : null}

      {fetchedAnimalsState.status?.fetched &&
      fetchedAnimalsState.result.length > 0 ? (
        <div className="list-animals-grid">
          <h2>Resultados de búsqueda</h2>
          <PropsColumns />
          {fetchedAnimalsState.result.map((animal) => (
            <AnimalCard animal={animal} key={animal.id_senasa} />
          ))}
        </div>
      ) : null}

      {fetchedAnimalsState.status?.loading ? (
        <div className="loading-div">
          <img src={loading} alt="loading gif" />
        </div>
      ) : null}
      {fetchedAnimalsState.status?.error && (
        <div className="error-msg-div">
          Oops! Hubo un error al hacer la búsqueda:{" "}
          {fetchedAnimalsState.status.error}
        </div>
      )}
      <hr />
    </div>
  );
}
