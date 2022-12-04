import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NoteFormEdit } from "./NoteFormEdit";
import loading from "../../assets/loading.gif";
import { cleanUpdatedNote } from "../../redux/features/notes";

export function NoteModalEdit(props) {
  const updatedNote = useSelector((state) => state.notes.updatedNote);
  const dispatch = useDispatch();

  if (!props.show) {
    return null;
  }

  function closeModal(e) {
    e.preventDefault();
    props.setShowValue(false);
    dispatch(cleanUpdatedNote());
  }

  return (
    <div className="w-full z-50 bg-white fixed inset-0 px-3 py-5  my-3 drop-shadow-lg h-fit max-w-xl mx-auto">
      <div>
        {updatedNote.pure ? (
          <NoteFormEdit
            note={props.note}
            closeModal={closeModal}
            setNoteToEdit={props.setNoteToEdit}
          />
        ) : null}
        {updatedNote.loading ? (
          <div className="modal-response">
            <img src={loading} alt="loading gif" />
            <div>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
        ) : null}
        {updatedNote.updated ? (
          <div className="modal-response">
            {updatedNote.msg}{" "}
            <div>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
        ) : null}
        {updatedNote.updated === 0 ? <div>Oops! {updatedNote.msg}</div> : null}
        {updatedNote.error ? (
          <div className="modal-response">
            {updatedNote.error}{" "}
            <div>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
