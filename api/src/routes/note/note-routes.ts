import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";
import { IReqAuth } from "../../types/user-types";
import { throwErrorIfUserIsNotRegisteredInDB } from "../user/user-r-auxiliary";
import { validateNewNoteMDB } from "../../validators/note-validators";
import { getAllNotesFromUser } from "./note-r-auxiliary";
import { Note, User } from "../../mongoDB/";
import { INote } from "../../mongoDB/models/Note";

const router = Router();

router.post("/newNote", jwtCheck, async (req: any, res) => {
  try {
    console.log("NEW NOTE BODY = ", req.body);
    const reqAuth = req.auth;
    const userId = reqAuth.sub;
    throwErrorIfUserIsNotRegisteredInDB(userId);
    let checkedNoteObj = validateNewNoteMDB(req.body);
    console.log("Nota validada...");

    // const newNote = await db.Note.create(checkedNoteObj);
    let notesOwner = await User.findById(userId);
    if (notesOwner) {
      console.log("usuario encontrado por id...");
      console.log(notesOwner);

      let nuevaNota = await Note.create(checkedNoteObj);
      console.log("Nueva nota = ", nuevaNota);

      notesOwner?.notes?.push(nuevaNota);
      console.log("nota pusheada...");

      await notesOwner.save();

      return res.status(200).send(checkedNoteObj);
    } else {
      return res
        .status(400)
        .send({ error: "No se encontró al usuario en la base de datos." });
    }
  } catch (error: any) {
    console.log(`Error en ruta  POST 'note/newNote'. ${error.message}`);
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
  console.log(`EN RUTA DELETE :ID`);

  try {
    const noteIdFromParams = req.params.id;
    console.log("noteIdFromParams = ", noteIdFromParams);

    if (!noteIdFromParams) {
      throw new Error(`Error. Debe ingresar un id por params.`);
    }
    const reqAuth: IReqAuth = req.auth;
    const userId: string = reqAuth.sub;
    let userInDB = await User.findById(userId);
    if (userInDB) {
      let noteFound = userInDB.notes.id(noteIdFromParams);
      console.log("NOTE FOUND = ", noteFound);
      userInDB.notes.id(noteIdFromParams)?.remove();
      await userInDB.save();
      console.log("Documento borrado.");
      // console.log(userInDB);
      return res
        .status(200)
        .send({ msg: "Nota eliminada exitosamente", status: true });
    } else {
      throw new Error("Usuario no encontrado en la base de datos.");
    }
  } catch (error: any) {
    console.log(`Error en ruta DELETE '/note/:id. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

router.put("/", jwtCheck, async (req: any, res) => {
  try {
    console.log(req.body);
    const noteId = req.body._id;
    console.log("NOTE ID = ", noteId);

    const reqAuth: IReqAuth = req.auth;
    const userId: string = reqAuth.sub;
    await throwErrorIfUserIsNotRegisteredInDB(userId);
    const validatedNote: INote = validateNewNoteMDB(req.body);

    let foundUser = await User.findById(userId);
    if (foundUser) {
      let noteToUpdate = foundUser?.notes.id(noteId);
      if (noteToUpdate) {
        noteToUpdate.title = req.body.title;
        noteToUpdate.comment = req.body.comment;
        noteToUpdate.theme = req.body.theme;
        noteToUpdate.importance = req.body.importance;
        console.log("noteToUpdate Updated = ", noteToUpdate);
        await foundUser.save();
      }
      console.log("USER AFTER SAVE = ", foundUser);
      return res.status(200).send({ updated: 1, msg: "Notaaaa ddbb MOngoo" });
    } else {
      throw new Error("No se ha encontrado al usuario en la base de datos.");
    }
  } catch (error: any) {
    console.log(`Error en ruta PUT 'note/:id'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
