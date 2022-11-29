import { User } from "../../mongoDB/";

export async function getAllNotesFromUser(userId: string) {
  try {
    let userFound = await User.findById(userId);
    if (userFound === null) {
      throw new Error(
        `El usuario con id '${userId}' no está registrado en la base de datos.`
      );
    } else {
      let allNotesFromUser = userFound.notes;
      return allNotesFromUser;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
