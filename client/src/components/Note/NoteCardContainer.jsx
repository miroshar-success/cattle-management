import React from "react";
import { PropsNotes } from "./PropsNotes";

export function NoteCardContainer({ notesToRender, setNoteToEdit }) {
  if (Array.isArray(notesToRender) && notesToRender.length === 0) {
    return <p>No hay notas para mostrar</p>;
  }
  if (Array.isArray(notesToRender) && notesToRender.length > 0) {
    return (
      <div>
        <PropsNotes notes={notesToRender} setNoteToEdit={setNoteToEdit} />
      </div>
    );
  }
}
