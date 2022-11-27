import { Request as JWTRequest } from "express-jwt";
import { Response } from "express";
import { throwErrorIfUserIsNotRegisteredInDB } from "../user/user-r-auxiliary";
import { validateNewNoteMDB } from "../../validators/note-validators";
import { getAllNotesFromUser } from "./note-r-auxiliary";
import { Note, User } from "../../mongoDB/";
import { INote } from "../../mongoDB/models/Note";

// POST NEW NOTE :
export async function handleCreateNewNote(req: JWTRequest, res: Response) {
  try {
    console.log("NEW NOTE BODY = ", req.body);

    const user_id = req.auth?.sub;
    throwErrorIfUserIsNotRegisteredInDB(user_id);
    let checkedNoteObj = validateNewNoteMDB(req.body);
    console.log("Nota validada...");

    // const newNote = await db.Note.create(checkedNoteObj);
    let notesOwner = await User.findById(user_id);
    if (notesOwner) {
      console.log("usuario encontrado por id...");
      console.log(notesOwner);

      let nuevaNota = await Note.create(checkedNoteObj);
      console.log("Nueva nota = ", nuevaNota);

      notesOwner?.notes?.push(nuevaNota);
      console.log("nota pusheada...");

      await notesOwner.save();

      return res.status(201).send(checkedNoteObj);
    } else {
      return res
        .status(404)
        .send({ error: "No se encontró al usuario en la base de datos." });
    }
  } catch (error: any) {
    console.log(`Error en ruta  POST 'note/newNote'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// GET ALL NOTES FROM USER :
export async function handleGetAllNotesFromUser(
  req: JWTRequest,
  res: Response
) {
  try {
    const userId = req.auth?.sub;
    if (!userId) {
      throw new Error("El user id no puede ser falso.");
    }
    throwErrorIfUserIsNotRegisteredInDB(userId);
    const allNotesFromUser = await getAllNotesFromUser(userId);
    return res.status(200).send(allNotesFromUser);
  } catch (error: any) {
    console.log(`Error en ruta GET 'note/all'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// DELETE NOTE :
export async function handleDeleteNoteRequest(req: JWTRequest, res: Response) {
  try {
    const noteIdFromParams = req.params.id;
    console.log("noteIdFromParams = ", noteIdFromParams);

    if (!noteIdFromParams) {
      throw new Error(`Error. Debe ingresar un id por params.`);
    }

    const userId = req.auth?.sub;
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
}

// UPDATE NOTE :
export async function handleUpdateNoteRequest(req: JWTRequest, res: Response) {
  try {
    console.log(req.body);
    const noteId = req.body._id;
    console.log("NOTE ID = ", noteId);

    const userId = req.auth?.sub;
    await throwErrorIfUserIsNotRegisteredInDB(userId);
    const validatedNote: INote = validateNewNoteMDB(req.body);

    let foundUser = await User.findById(userId);
    if (foundUser) {
      let noteToUpdate = foundUser?.notes.id(noteId);
      if (noteToUpdate) {
        noteToUpdate.title = validatedNote.title;
        noteToUpdate.comment = validatedNote.comment;
        noteToUpdate.theme = validatedNote.theme;
        noteToUpdate.importance = validatedNote.importance;
        console.log("noteToUpdate Updated = ", noteToUpdate);
        await foundUser.save();
        console.log("USER AFTER SAVE = ", foundUser);
        return res.status(201).send({ updated: 1, msg: "Nota actualizada." });
      } else {
        throw new Error("Nota a editar no encontrada.");
      }
    } else {
      throw new Error("No se ha encontrado al usuario en la base de datos.");
    }
  } catch (error: any) {
    console.log(`Error en ruta PUT 'note/:id'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}
