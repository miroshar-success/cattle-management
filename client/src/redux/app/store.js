import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/notes/notesSlice";
import animalsSlice from "../features/animals/animalsSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    animals: animalsSlice,
    user: userSlice,
  },
});
