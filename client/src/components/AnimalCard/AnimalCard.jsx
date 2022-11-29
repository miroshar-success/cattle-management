import React from "react";
import { useDispatch } from "react-redux";
import { getAllAnimals, deleteAnimal } from "../../redux/features/animals";

import { ModalEdit } from "../Modal/ModalEdit";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { BiEditAlt } from "react-icons/bi";

export function AnimalCard({ animal }) {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const [showValue, setShowValue] = React.useState(false);

  function showModal(e) {
    e.preventDefault();
    setShowValue(true);
  }

  function handleDeleteWithPrompt(e) {
    let confirmPrompt = prompt(
      "Para confirmar la eliminación, escriba 'ELIMINAR'."
    );
    if (
      confirmPrompt === "ELIMINAR" ||
      confirmPrompt === "eliminar" ||
      confirmPrompt === "Eliminar"
    ) {
      console.log(`Eliminando animal con id ${e.target.value}`);
      const animal_id = e.target.value;
      dispatch(deleteAnimal(animal_id, accessToken));
      dispatch(getAllAnimals(accessToken));
    } else {
      console.log(
        `No se ha eliminado al animal porque confirmPrompt == ${confirmPrompt}`
      );
    }
  }

  return (
    <div className="flex gap-3">
      <Link to={`/details/${animal?.id_senasa}`}>
        <TbListDetails />
      </Link>

      <button
        className="btn-edit"
        value={animal?.id_senasa}
        onClick={showModal}
      >
        <BiEditAlt />
      </button>
      <button
        className="btn-delete"
        value={animal?.id_senasa}
        onClick={handleDeleteWithPrompt}
      >
        {/* <MdDeleteOutline value={animal?.id_senasa} /> */}X
      </button>
      <ModalEdit show={showValue} setShowValue={setShowValue} animal={animal} />
    </div>
  );
}
