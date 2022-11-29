import { Request as JWTRequest } from "express-jwt";
import { Response } from "express";
import { validateNewNoteMDB } from "../../validators/note-validators";
import { getAllNotesFromUser } from "./note-r-auxiliary";
import { Note, User } from "../../mongoDB/";
import { INote } from "../../mongoDB/models/Note";

// POST NEW NOTE :
export async function handleCreateNewNote(req: JWTRequest, res: Response) {
  try {
    console.log("NEW NOTE BODY = ", req.body);
    const user_id = req.auth?.sub;
    let validatedNoteObj = validateNewNoteMDB(req.body);
    console.log("Nota validada...");

    // const newNote = await db.Note.create(validatedNoteObj);
    let userInDB = await User.findById(user_id);
    if (userInDB) {
      console.log("usuario encontrado por id...");
      console.log(userInDB);

      let nuevaNota = await Note.create(validatedNoteObj);
      console.log("Nueva nota = ", nuevaNota);

      userInDB.notes.push(nuevaNota);
      console.log("nota pusheada...");

      await userInDB.save();

      return res.status(201).send(validatedNoteObj);
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
    const userId = req.auth?.sub;

    if (!noteIdFromParams) {
      throw new Error(`Error. Debe ingresar un id por params.`);
    }
    let response = {
      noteInDB: 0,
      userNote: 0,
      total: 0,
      status: false,
      msg: "",
    };
    const noteInDB = await Note.findByIdAndDelete(noteIdFromParams);
    if (noteInDB) {
      response.noteInDB++;
      response.total++;
    }
    const userInDB = await User.findById(userId);

    if (userInDB) {
      let noteFound = userInDB.notes.id(noteIdFromParams);

      if (noteFound) {
        console.log("NOTE FOUND = ", noteFound);
        noteFound.remove();
        await userInDB.save();
        console.log("Documento borrado.");
        // userInDB.notes.id(noteIdFromParams)?.remove();
        // console.log(userInDB);
        response.userNote++;
        response.total++;
        response.status = true;
        return res.status(200).send(response);
      }
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
    const userId = req.auth?.sub;
    let response = {
      noteInDB: 0,
      userNote: 0,
      total: 0,
      status: false,
      msg: "",
    };
    const validatedNote: INote = validateNewNoteMDB(req.body);

    let noteInDB = await Note.findByIdAndUpdate(noteId, validatedNote);
    if (noteInDB) {
      response.noteInDB++;
      response.total++;
    }

    let userInDB = await User.findById(userId);
    if (userInDB) {
      let noteToUpdate = userInDB.notes.id(noteId);
      if (noteToUpdate) {
        noteToUpdate.title = validatedNote.title;
        noteToUpdate.comment = validatedNote.comment;
        noteToUpdate.theme = validatedNote.theme;
        noteToUpdate.importance = validatedNote.importance;
        console.log("noteToUpdate Updated = ", noteToUpdate);
        await userInDB.save();
        response.userNote++;
        response.total++;
        response.status = true;
        return res.status(201).send(response);
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
