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

router.post("/newNote", jwtCheck, handleCreateNewNote);
router.get("/all", jwtCheck, handleGetAllNotesFromUser);
router.delete("/:id", handleDeleteNoteRequest);
router.put("/", jwtCheck, handleUpdateNoteRequest);

export default router;
