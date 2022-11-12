import axios from "axios";
import { header } from "../../../constants/token";
import { URL } from "../../../constants/urls";
import { newNote, setLoadingNotes, setNotes, update } from "./notesSlice";

export const getNotesFromUser = (token) => {
  return async (dispatch) => {
    dispatch(setLoadingNotes({ loading: true }));
    try {
      const response = await axios(URL + "note/all", header(token));
      dispatch(setNotes(response.data));
    } catch (error) {
      dispatch(setNotes({ error: error.message }));
    }
  };
};

export function postNewNote(newNoteObj, token) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        URL + "note/newNote",
        newNoteObj,
        header(token)
      );
      dispatch(newNote(response.data));
    } catch (error) {
      dispatch(newNote({ error: error.message }));
    }
  };
}

export function deleteNote(noteId, token) {
  return async function () {
    try {
      await axios.delete(URL + `note/${noteId}`, header(token));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateNote(noteObj, token) {
  return async function (dispatch) {
    try {
      const response = await axios.put(URL + "note/", noteObj, header(token));
      dispatch(update(response.data));
    } catch (error) {
      dispatch(update({ error: "Ha habido un error" }));
    }
  };
}

export function setUpdatedNoteToLoading() {
  return async function (dispatch) {
    try {
      dispatch(update({ loading: true }));
    } catch (error) {
      dispatch(update({ error: error.message }));
    }
  };
}

export function cleanUpdatedNote() {
  return async function (dispatch) {
    try {
      dispatch(cleanUpdatedNote({ pure: true }));
    } catch (error) {
      dispatch(cleanUpdatedNote({ error: error.message }));
    }
  };
}
