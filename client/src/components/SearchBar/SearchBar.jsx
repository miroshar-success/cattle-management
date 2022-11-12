import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchQuery,
  setFetchedAnimalsToLoading,
  clearFetchedAnimals,
} from "../../redux/features/animals";
import { PropsColumns } from "../PropsColumns/PropsColumns";

export function SearchBar() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const [input, setInput] = React.useState({
    inputValue: "",
  });

  const fetchedAnimalsState = useSelector((state) => state.animals.fetchedAnimals);

  function handleChange(e) {
    setInput({
      [e.target.name]: e.target.value,
    });
  }

  function dispatchClearFetchedAnimals() {
    console.log(`dispatching clearFetchedAnimals...`);
    dispatch(clearFetchedAnimals());
  }

  function handleSubmit(e) {
    console.log("handleSubmit invoqued!");
    e.preventDefault();
    dispatch(setFetchedAnimalsToLoading());
    dispatch(searchQuery(input.inputValue, accessToken));
  }
  return (
    <>
      <div className="w-full flex flex-col text-gray px-3 py-5 my-5 bg-gray/10">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-full"
        >
          <label className="px-3 font-semibold" htmlFor="inputValue">
            ID SENASA / Nombre / Número de dispositivo
          </label>
          <input
            className=" mt-1  py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green focus:ring-light_green block w-full rounded-md sm:text-sm focus:ring-1  px-2"
            type="text"
            name="inputValue"
            value={input.inputValue}
            onChange={handleChange}
            placeholder="Ingrese nombre o código de identificación."
          />
          <div className="flex items-center gap-5 justify-center w-full my-5">
            <button
              type="submit"
              className=" border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500"
            >
              Buscar
            </button>
            <button
              type="button"
              className=" bg-white border border-solid border-green px-3 py-1 rounded-sm text-green hover:bg-green hover:text-white hover:border-green transition-all ease-in-out duration-500"
              onClick={dispatchClearFetchedAnimals}
            >
              {" "}
              Limpiar resultados{" "}
            </button>
          </div>
        </form>
      </div>
      {fetchedAnimalsState?.status?.fetched &&
      fetchedAnimalsState?.result?.length === 0 ? (
        <div className="text-green text-xl border-solid  border-b-2 border-green mb-14 mx-3">
          Coincidencias encontradas: {fetchedAnimalsState.result?.length}
        </div>
      ) : null}
      {fetchedAnimalsState?.status?.error ? (
        <div>{fetchedAnimalsState?.status?.error}</div>
      ) : null}
      {fetchedAnimalsState?.status?.fetched &&
      Array.isArray(fetchedAnimalsState?.result) &&
      fetchedAnimalsState.result?.length > 0 ? (
        <div>
          <div className="text-green text-xl border-solid  border-b-2 border-green my-3 mx-3">
            Coincidencias encontradas: {fetchedAnimalsState.result?.length}
          </div>

          <PropsColumns animals={fetchedAnimalsState.result} />
        </div>
      ) : null}
    </>
  );
}
