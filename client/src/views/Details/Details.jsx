import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailCard from "../../components/DetailCard/DetailCard";
import { NavBar } from "../../components/NavBar/NavBar";
import { getAnimalDetail, resetDetail } from "../../redux/features/animals";


export function Details() {
  const token = localStorage.getItem("tokenCattleTracker");
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const animal = useSelector((state) => state.animals.detail);
  React.useEffect(() => {
    dispatch(getAnimalDetail(id, token));
    return () => {
      dispatch(resetDetail());
    }
  }, [  id, token ]);

  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />
      <h1 className="text-green text-2xl my-5">Detalle </h1>
      <DetailCard animal={animal} />
    </div>
  );
}
