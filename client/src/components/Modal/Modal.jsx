import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormMdlzd } from "../Form/FormMdlzd";
import loading from "../../assets/loading.gif";
import { cleanNewAnimal } from "../../redux/features/animals";

export function Modal(props) {
  const newAnimalState = useSelector((state) => state.animals.newAnimal);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(`Componente Modal montado`);
    dispatch(cleanNewAnimal());
  }, [dispatch]);

  if (!props.show) {
    return null;
  }

  function closeModal(e) {
    e.preventDefault();
    props.setShowValue(false);
    dispatch(cleanNewAnimal());
  }

  return (
    <div className="w-full z-50 bg-white absolute inset-0 px-3 py-5  my-3 drop-shadow-lg h-fit max-w-xl mx-auto ">
      {newAnimalState.pure ? <FormMdlzd closeModal={closeModal} /> : null}
      {newAnimalState.loading ? (
        <div>
          <img src={loading} alt="loading gif" />
        </div>
      ) : null}
      {newAnimalState.msg ? (
        <div className="modal-response">{newAnimalState.msg} </div>
      ) : null}
      {newAnimalState.error ? (
        <div className="modal-response-container">
          <div className="modal-response-error">
            {" "}
            <p>Oops! Hubo un error: {newAnimalState.error} </p>{" "}
          </div>
        </div>
      ) : null}

      <div className="modal-footer">
        <button onClick={closeModal}>X</button>
      </div>
    </div>
  );
}
