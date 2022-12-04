import React from "react";
import { useDispatch } from "react-redux";
import { NoteModalEdit } from "./NoteModalEdit";
import { BiEditAlt } from "react-icons/bi";
import { deleteNote, getNotesFromUser } from "../../redux/features/notes";

export function NoteAcciones({ note }) {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const [showValue, setShowValue] = React.useState(false);

  function handleDeleteWithPrompt(e) {
    const note_id = e.target.value;
    dispatch(deleteNote(note_id, accessToken));
    setTimeout(() => {
      dispatch(getNotesFromUser(accessToken));
    }, 1000);
  }

  function showModal(e) {
    e.preventDefault();
    setShowValue(true);
  }

  return (
    <div className="flex gap-3">
      <button className="btn-edit" value={note?._id} onClick={showModal}>
        <BiEditAlt />
      </button>
      <button
        className="btn-delete"
        value={note?._id}
        onClick={handleDeleteWithPrompt}
      >
        X
      </button>
      <NoteModalEdit show={showValue} setShowValue={setShowValue} note={note} />
    </div>
  );
}
