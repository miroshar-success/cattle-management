import React from "react";
import InputForm from "../Form/InputForm";
import axios from "axios";
import { URL } from "../../constants/urls";
import { header } from "../../constants/token";
import { useDispatch } from "react-redux";
import { getNotesFromUser } from "../../redux/features/notes";

export function NoteForm() {
  const [input, setInput] = React.useState({
    title: "",
    theme: "",
    comment: "",
    importance: "",
  });
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const dispatch = useDispatch();
  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Nueva nota despachada...");
    try {
      const response = await axios.post(
        URL + "note/newNote",
        input,
        header(accessToken)
      );
      if (response.status >= 200 && response.status < 210) {
        alert("Nota creada exitosamente");
        setInput({
          title: "",
          theme: "",
          comment: "",
          importance: "",
        });
        dispatch(getNotesFromUser(accessToken));
      }
    } catch (error) {
      console.log(`Error en el handleSubmit`);
      console.log(`ERROR = `, error);
      let errorMessage = error.message;
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      alert(`Hubo un error al intentar crear la nota. ${errorMessage}`);
    }
  }

  return (
    <div>
      <div class="text-green text-xl border-solid  border-b-2 border-green my-3 mx-3">
        Nueva nota
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="inside-form-container flex mx-3">
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
                maxLength={250}
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
              maxLength={40}
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
            <button className="border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500  flex items-center gap-3">
              Guardar{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
