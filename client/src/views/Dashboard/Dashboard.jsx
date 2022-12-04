import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../../components/NavBar/NavBar";
import { CardPregnantStatistics } from "../../components/CardContainer/CardPregnantStatistics";
import { FilterButtons } from "../../components/FilterButtons.jsx/FilterButtons";
import { getStats, setStatsToLoading } from "../../redux/features/animals";
import { DoughnutChart } from "../../charts/DoughnutChart";
import "./dashboard.css";
import { PieChart } from "../../charts/PieChart";
import { VerticalBarChart } from "../../charts/VerticalBarChart";
import { CardFilterContainer } from "../../components/CardContainer/CardFilterContainer";
import { PieChartTwoObj } from "../../charts/PieChartTwoObj";
import { FilterCustomBtn } from "../../components/FilterButtons.jsx/FilterCustomBtn";
import loadingGif from "../../assets/loading.gif";

export function Dashboard() {
  const token = localStorage.getItem("tokenCattleTracker");
  const dispatch = useDispatch();
  const statsState = useSelector((state) => state.animals.stats);

  const [filters, setFilters] = useState({
    races: "",
    location: "",
    type_of_animal: "",
    pregnant: "",
    sex: "",
  });

  function handleFilterChange(e) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }

  React.useEffect(() => {
    if (statsState.pure || statsState.error) {
      dispatch(setStatsToLoading());
      setTimeout(() => {
        dispatch(getStats(token));
      }, 50);
    }
  }, [dispatch, token]);

  if (statsState.loading) {
    return (
      <div className="max-w-7xl mx-auto ">
        <NavBar />
        <div className="px-2 mt-12 font-sans text-gray">
          <h1 className="text-green text-3xl font-semibold my-3">Dashboard</h1>
          <div className="lg:flex flex-col justify-center items-center">
            <img src={loadingGif} alt="loading gif" />
          </div>
        </div>
      </div>
    );
  }

  if (statsState?.error) {
    return (
      <div className="max-w-7xl mx-auto ">
        <NavBar />

        <div className="px-2 mt-12 font-sans text-gray">
          <h1 className="text-green text-3xl font-semibold my-3">Dashboard</h1>
          <div>
            <h2 className="lg:flex flex-col justify-center items-center">
              {`Oops! Hubo un error. ${statsState.error}`}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (statsState?.allFoundAndCount?.count === 0) {
    return (
      <>
        <div className="max-w-7xl mx-auto ">
          <NavBar />
          <div className="px-2 mt-12 font-sans text-gray">
            <h1 className="text-green text-3xl font-semibold my-3">
              Dashboard
            </h1>

            <div className="lg:flex flex-col justify-center items-center">
              <h2 className="lg:flex flex-col justify-center items-center">
                Todavía no tienes animales cargados en la base de datos
              </h2>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (statsState?.allFoundAndCount?.count > 0) {
    return (
      <>
        <div className="max-w-7xl mx-auto ">
          <NavBar />
          <div className="px-2 mt-12 font-sans text-gray">
            <h1 className="text-green text-3xl font-semibold my-3">
              Dashboard
            </h1>

            <div className="lg:flex flex-col justify-center items-center">
              <br />
              <div className="lg:flex flex-col justify-center items-center">
                <h2 className="text-green text-2xl my-5">Razas</h2>
                <div className="graph400">
                  {statsState?.races && (
                    <DoughnutChart
                      statsObj={statsState.races}
                      by="raza"
                      title="Raza"
                    />
                  )}
                </div>

                <div>
                  {statsState?.races && (
                    <FilterButtons
                      filtersArray={Object.keys(statsState?.races)}
                      filters={filters}
                      setFilters={setFilters}
                      prop="races"
                    />
                  )}
                </div>
              </div>
              <div>
                {filters?.races && statsState?.races && (
                  <CardFilterContainer
                    animalsToRender={statsState.races[filters.races]?.rows}
                  />
                )}
              </div>
              <br />
              <div className="lg:flex flex-col justify-center items-center">
                <h2 className="text-green text-2xl my-5">Localizaciones</h2>
                <div className="graph400">
                  {statsState?.location && (
                    <PieChart
                      statsObj={statsState.location}
                      by="localización"
                      title="Localización"
                    />
                  )}
                </div>
                <div>
                  {statsState?.location && (
                    <FilterButtons
                      filtersArray={Object.keys(statsState?.location)}
                      filters={filters}
                      setFilters={setFilters}
                      prop="location"
                    />
                  )}
                </div>
              </div>
              <div>
                {filters?.location && statsState?.location && (
                  <CardFilterContainer
                    animalsToRender={
                      statsState.location[filters.location]?.rows
                    }
                  />
                )}
              </div>
              <br />
              <div className="lg:flex flex-col justify-center items-center">
                <h2 className="text-green text-2xl my-5">Sexo</h2>
                <div className="graph400">
                  {statsState?.sex && (
                    <PieChartTwoObj
                      statsObjOne={statsState?.sex?.macho}
                      statsObjTwo={statsState?.sex?.hembra}
                      by="sexo"
                      title="Sexo del animal"
                      labels={["Macho", "Hembra"]}
                    />
                  )}
                </div>
                <div className="flex items-center gap-5 justify-center w-full my-5">
                  <FilterCustomBtn
                    tag="Machos"
                    value={"macho"}
                    name="sex"
                    onClick={handleFilterChange}
                  />
                  <FilterCustomBtn
                    tag="Hembras"
                    value="hembra"
                    name="sex"
                    onClick={handleFilterChange}
                  />
                  <FilterCustomBtn
                    tag={"Limpiar"}
                    value={""}
                    name="sex"
                    onClick={handleFilterChange}
                  />
                </div>
              </div>
              <div>
                {filters?.sex && statsState?.sex && (
                  <CardFilterContainer
                    animalsToRender={statsState.sex[filters.sex]?.rows}
                  />
                )}
              </div>

              <div className="lg:flex flex-col justify-center items-center">
                <h2 className="text-green text-2xl my-5">Tipos de animales</h2>

                <div className="graph600">
                  {statsState?.types && (
                    <VerticalBarChart
                      statsObj={statsState.types}
                      by="tipo"
                      title="Tipo de animal"
                    />
                  )}
                </div>
                <div className="graph400">
                  {statsState?.types && (
                    <PieChart
                      statsObj={statsState.types}
                      by="tipo"
                      title="Tipo de animal"
                    />
                  )}
                </div>
                <div>
                  {statsState?.types && (
                    <FilterButtons
                      filtersArray={Object.keys(statsState.types)}
                      filters={filters}
                      setFilters={setFilters}
                      prop="type_of_animal"
                    />
                  )}
                </div>
              </div>
              <div>
                {filters?.type_of_animal && statsState?.types && (
                  <CardFilterContainer
                    animalsToRender={
                      statsState.types[filters.type_of_animal]?.rows
                    }
                  />
                )}
              </div>
              <br />
              <div>
                {filters?.pregnant && statsState?.sex?.[filters.pregnant] && (
                  <CardFilterContainer
                    animalsToRender={statsState?.sex[filters.pregnant]?.rows}
                  />
                )}
              </div>
              <br />
              <div className="lg:flex flex-col justify-center items-center">
                <h2 className="text-green text-2xl my-5">
                  Próximos partos esperados
                </h2>
                <div>
                  {statsState?.pregnant && (
                    <CardPregnantStatistics
                      animalsToRender={statsState?.pregnant?.rows}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
