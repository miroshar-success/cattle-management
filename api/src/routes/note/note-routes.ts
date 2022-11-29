import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";

import {
  handleCreateNewNote,
  handleDeleteNoteRequest,
  handleGetAllNotesFromUser,
  handleUpdateNoteRequest,
} from "./note-r-middlewares";

const router = Router();

// - - - - - - - - - - RUTAS : - - - - - - - - - -

// CREATE NEW NOTE :
router.post("/newNote", jwtCheck, handleCreateNewNote);
// GET ALL NOTES FROM USER :
router.get("/all", jwtCheck, handleGetAllNotesFromUser);
// DELETE NOTE :
router.delete("/:id", jwtCheck, handleDeleteNoteRequest);
// UPDATE NOTE :
router.put("/", jwtCheck, handleUpdateNoteRequest);

export default router;
