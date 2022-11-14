import { INote } from "../../mongoDB/models/Note";
import { User } from "../../mongoDB/";
import { IUser } from "../../mongoDB/models/User";

export async function getAllNotesFromUser(userId: string) {
  try {
    let userFound: IUser | null = await User.findById(userId);
    if (userFound !== null) {
      let allNotesFromUser: INote[] = userFound.notes;
      return allNotesFromUser;
    }
    throw new Error(`No se encontró al usuario en la base de datos.`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
