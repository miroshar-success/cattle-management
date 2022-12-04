import React from "react";
import InputForm from "../Form/InputForm";
import axios from "axios";
import Swal from "sweetalert2";
import { URL } from "../../constants/urls";
import { header } from "../../constants/token";
import { useDispatch } from "react-redux";
import { getNotesFromUser } from "../../redux/features/notes";

export function NoteFormEdit({ note, closeModal }) {
  const [input, setInput] = React.useState({
    _id: note._id || "",
    title: note.title || "",
    theme: note.theme || "",
    comment: note.comment || "",
    importance: note.importance || "",
  });

  const accessToken = localStorage.getItem("tokenCattleTracker");
  const dispatch = useDispatch();
  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmitWithNoDispatch(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        URL + "note/",
        input,
        header(accessToken)
      );
      if (response.status >= 200 && response.status < 210) {
        Swal.fire({
          title: "Nota actualizada",
          icon: "success",
          timer: 1700,
        });
        dispatch(getNotesFromUser(accessToken));
      }
    } catch (error) {
      let errorMessage = error.message;
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      Swal.fire({
        title: "Error al actualizar la nota",
        text: `${errorMessage}`,
        icon: "error",
      });
    }
  }

  return (
    // <div className="fixed inset-20 bg-slate-200 shadow-lg shadow-slate-500/50">
    <div>
      <div className="text-green text-xl border-solid  border-b-2 border-green my-3 mx-3">
        Editar nota
      </div>
      <form action="" onSubmit={handleSubmitWithNoDispatch}>
        <div className="inside-form-container flex-col mx-3">
          <div className="comentario-input">
            <div className="flex items-center gap-3 mb-3 w-full">
              <label
                htmlFor="comment"
                className="text-gray font-semibold w-[120px] md:w-[130px] text-sm after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Comentario
              </label>
              <textarea
                className="bg-gray/10 border border-solid border-gray/10 rounded-sm px-3 py-1  w-full"
                type="text"
                name="comment"
                id="comment"
                maxLength={900}
                onChange={handleOnChange}
                required={true}
                rows={5}
                cols={23}
                value={input.comment}
              />
            </div>
          </div>
          <div className="otros-inputs mx-3">
            <InputForm
              handleOnChange={handleOnChange}
              type="text"
              name="title"
              text="Título"
              value={input.title}
            />
            <InputForm
              handleOnChange={handleOnChange}
              type="text"
              name="importance"
              text="Importancia"
              placeholder={"Alta / Media / Baja"}
              value={input.importance}
            />
            <InputForm
              handleOnChange={handleOnChange}
              type="text"
              name="theme"
              text="Tema"
              value={input.theme}
            />
            <div className="">
              <button className="border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500  flex items-center gap-3">
                Guardar{" "}
              </button>
              <button
                className=" bg-white border border-solid border-green px-3 py-1 mt-5 rounded-sm text-green hover:bg-green hover:text-white hover:border-green transition-all ease-in-out duration-500"
                type="button"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
