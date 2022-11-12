import { INote } from "../../types/note-types";
import db from "../../models";
import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";
import { IReqAuth } from "../../types/user-types";
import {
  throwErrorIfUserIsNotRegisteredInDB,
  userIsRegisteredInDB,
} from "../user/user-r-auxiliary";
import { validateNewNote } from "../../validators/note-validators";
import { getAllNotesFromUser } from "./note-r-auxiliary";
const router = Router();

router.post("/newNote", jwtCheck, async (req: any, res) => {
  try {
    console.log("NEW NOTE BODY = ", req.body);
    const reqAuth = req.auth;
    const userId = reqAuth.sub;
    throwErrorIfUserIsNotRegisteredInDB(userId);
    let checkedNoteObj = validateNewNote(req.body);
    console.log("Nota validada...");

    const newNote = await db.Note.create(checkedNoteObj);
    console.log("Nota creada.");

    await newNote.setUser(userId);
    console.log("Nueva nota asociada y creada: ", newNote.toJSON());
    return res.status(200).send(newNote);
  } catch (error: any) {
    console.log(`Eror en ruta  POST 'note/newNote'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

router.get("/all", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth = req.auth;
    const userId = reqAuth.sub;
    throwErrorIfUserIsNotRegisteredInDB(userId);
    const allNotesFromUser = await getAllNotesFromUser(userId);
    return res.status(200).send(allNotesFromUser);
  } catch (error: any) {
    console.log(`Error en ruta GET 'note/all'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

router.delete("/:id", jwtCheck, async (req: any, res) => {
  try {
    const noteIdFromParams = req.params.id;
    if (!noteIdFromParams) {
      throw new Error(`Error. Debe ingresar un id por params.`);
    }
    const reqAuth: IReqAuth = req.auth;
    const userId: string = reqAuth.sub;
    let deletedNote = await db.Note.destroy({
      where: {
        id: noteIdFromParams,
        UserId: userId,
      },
    });
    console.log("DELETED NOTE = ", deletedNote);
    return res
      .status(200)
      .send({ msg: "Nota eliminada exitosamente", status: true });
  } catch (error: any) {
    console.log(`Error en ruta DELETE '/note/:id. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

router.put("/", jwtCheck, async (req: any, res) => {
  try {
    console.log(req.body);
    const noteId = req.body.id;
    const reqAuth: IReqAuth = req.auth;
    const userId: string = reqAuth.sub;
    await throwErrorIfUserIsNotRegisteredInDB(userId);
    const validatedNote: INote = validateNewNote(req.body);
    let updatedNote = await db.Note.update(
      { ...validatedNote, id: noteId },
      {
        where: {
          id: noteId,
          UserId: userId,
        },
      }
    );
    return res.status(200).send({
      updated: Number(updatedNote[0]),
      msg: `${updatedNote[0]} nota ha sido actualizada exitosamente.`,
    });
  } catch (error: any) {
    console.log(`Error en ruta PUT 'note/:id'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
