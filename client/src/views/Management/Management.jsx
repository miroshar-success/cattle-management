import React from "react";
import { CardContainer } from "../../components/CardContainer/CardContainer";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Modal } from "../../components/Modal/Modal";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NavBar } from "../../components/NavBar/NavBar";

export function Management() {
  const [showValue, setShowValue] = React.useState(false);

  function showModal(e) {
    e.preventDefault();
    setShowValue(true);
  }
  return (
    <div className="max-w-7xl mx-auto ">
      <NavBar />
      <div className="px-2 mt-12 font-sans text-gray">
        <h1 className="text-green text-3xl font-semibold my-5">
          Gestión de animales
        </h1>
        <div className="">
          <button
            className="border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500  flex items-center gap-3"
            onClick={showModal}
          >
            <IoMdAddCircleOutline />
            Agregar animal{" "}
          </button>
          <Modal show={showValue} setShowValue={setShowValue} />
        </div>

        <SearchBar />

        <CardContainer />
      </div>
    </div>
  );
}
