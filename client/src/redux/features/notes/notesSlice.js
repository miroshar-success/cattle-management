import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: { newNote: { pure: true }, allNotes: { pure: true } },
    updatedNote: { pure: true },
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes.allNotes = action.payload;
    },
    setLoadingNotes: (state, action) => {
      state.notes.allNotes = action.payload;
    },
    newNote: (state, action) => {
      state.notes.newNote = action.payload;
    },
    update: (state, action) => {
      state.updatedNote = action.payload;
    },
    cleanUpdate: (state, action) => {
      state.updatedNote = action.payload;
    }
  },
});

//export actions
export const { setNotes, setLoadingNotes, newNote,update } = notesSlice.actions;

//export only the reducers
export default notesSlice.reducer;
