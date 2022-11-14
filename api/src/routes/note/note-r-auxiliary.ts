import db from "../../models";
import { INote, INoteMDB } from "../../types/note-types";

import { User, Note } from "../../mongoDB/setup";

export async function getAllNotesFromUser(userId: string) {
  try {
    let userFound = await User.findById(userId);
    if (userFound !== null) {
      let allNotesFromUser = userFound.notes;
      return allNotesFromUser;
    }
    throw new Error(`No se encontró al usuario en la base de datos.`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
