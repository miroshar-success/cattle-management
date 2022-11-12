import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormMdlzd } from "../Form/FormMdlzd";
import loading from "../../assets/loading.gif";
import { cleanUpdateAnimal } from "../../redux/features/animals";

export function ModalEdit(props) {
  const updatedAnimal = useSelector((state) => state.animals.updatedAnimal);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(`useEffect de ModalEdit...`);
  }, []);

  if (!props.show) {
    return null;
  }

  function closeModal(e) {
    e.preventDefault();
    props.setShowValue(false);
    dispatch(cleanUpdateAnimal());
  }

  return (
    <div className="w-full z-50 bg-white fixed inset-0 px-3 py-5  my-3 drop-shadow-lg  max-w-xl mx-auto overflow-auto">
      {updatedAnimal.pure ? (
        <FormMdlzd animal={props.animal} closeModal={closeModal} />
      ) : null}
      {updatedAnimal.loading ? (
        <div>
          <img src={loading} alt="loading gif" />
        </div>
      ) : null}
      {updatedAnimal.updated ? <div>{updatedAnimal.msg}</div> : null}
      {updatedAnimal.updated === 0 ? (
        <div>Oops! {updatedAnimal.msg}</div>
      ) : null}
      {updatedAnimal.error ? (
        <div className="modal-response">{updatedAnimal.error} </div>
      ) : null}

      <div className="modal-footer">
        <button onClick={closeModal}>X</button>
      </div>
    </div>
  );
}
