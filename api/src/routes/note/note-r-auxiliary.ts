import db from "../../models";
import { INote } from "../../types/note-types";

export async function getAllNotesFromUser(userId: string): Promise<INote[]> {
  try {
    const allNotesFromUser = await db.Note.findAll({
      where: {
        UserId: userId,
      },
    });
    return allNotesFromUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
