import React from "react";
export function FilterButtons({ filtersArray, filters, setFilters, prop }) {
  function handleFilterOnClick(e) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div>
      <div>
        {Array.isArray(filtersArray) && filtersArray.length === 0 ? (
          <div>No hay nada que filtrar</div>
        ) : null}
        <div>
          {Array.isArray(filtersArray) && filtersArray.length > 0 ? (
            <div className="flex items-center gap-5 justify-left w-full my-5 flex-wrap">
              {filtersArray.map((filter) => (
                <button
                  className=" border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500"
                  onClick={handleFilterOnClick}
                  key={filter}
                  name={prop}
                  value={filter}
                >
                  {filter}
                </button>
              ))}
              <button
                className=" bg-white border border-solid border-green px-3 py-1 rounded-sm text-green hover:bg-green hover:text-white hover:border-green transition-all ease-in-out duration-500"
                onClick={handleFilterOnClick}
                name={prop}
                value={""}
              >
                Limpiar
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
