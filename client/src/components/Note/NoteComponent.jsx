import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NoteForm } from "./NoteForm";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NoteCardContainer } from "./NoteCardContainer";
import loadingGif from "../../assets/loading.gif";
import { NoteFormEdit } from "./NoteFormEdit";
import { getNotesFromUser } from "../../redux/features/notes";

export function NoteComponent() {
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const [showNoteForm, setShowNoteForm] = React.useState(false);
  const notesState = useSelector((state) => state.notes.notes);

  const dispatch = useDispatch();
  //eslint-disable-next-line
  const [showEditForm, setShowEditForm] = React.useState(false);
  //eslint-disable-next-line
  const [noteToEdit, setNoteToEdit] = React.useState({
    _id: "",
    title: "",
    theme: "",
    comment: "",
    importance: "",
  });

  React.useEffect(() => {
    dispatch(getNotesFromUser(accessToken));
  }, [dispatch]);

  React.useEffect(() => {
    console.log(`Renderizando otra vez en el useEffect`);
  }, [notesState]);

  function toggleNoteForm(e) {
    e.preventDefault();
    setShowNoteForm(!showNoteForm);
  }
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-green text-2xl font-semibold my-3">
        Notas personales
      </h2>
      <div>
        <button
          className="border border-solid border-transparent bg-green px-3 py-1 rounded-sm text-white hover:bg-white hover:text-green hover:border-green transition-all ease-in-out duration-500 flex items-center gap-3"
          onClick={toggleNoteForm}
        >
          <IoMdAddCircleOutline />
          Crear nota{" "}
        </button>
      </div>
      <div>{showNoteForm && <NoteForm />}</div>
      <div className="text-green text-xl border-solid  border-b-2 border-green my-3 ">
        Mis notas
      </div>
      {showEditForm && <NoteFormEdit note={noteToEdit} />}
      {notesState?.allNotes?.loading && (
        <img src={loadingGif} alt="loading gif" />
      )}
      {notesState?.allNotes && Array.isArray(notesState?.allNotes) && (
        <NoteCardContainer notesToRender={notesState?.allNotes} />
      )}
    </div>
  );
}
