import mongoose, { Types, Schema } from "mongoose";

// --- prueba con NoteSchema :
export interface INote {
  // _id: Types.ObjectId;
  title?: string;
  theme?: string;
  comment: string;
  importance?: string;
}

export const noteSchema: Schema = new Schema(
  {
    // _id: String,
    title: String,
    theme: String,
    comment: { type: String, required: true },
    importance: String,
  },
  { timestamps: true }
);

// const Note = mongoose.model<INote>("Note", noteSchema);
