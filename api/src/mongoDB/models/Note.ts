import { Types, Schema } from "mongoose";

export interface INote {
  _id?: Types.ObjectId;
  title?: string;
  theme?: string;
  comment: string;
  importance?: EImportance;
}

export enum EImportance {
  Alta = "Alta",
  Media = "Media",
  Baja = "Baja",
}

export const noteSchema: Schema = new Schema<INote>(
  {
    title: { type: String, required: false, maxlength: 40 },
    theme: { type: String, required: false, maxlength: 40 },
    comment: { type: String, required: true, maxlength: 250 },
    importance: { type: String, required: false },
  },
  { timestamps: true }
);

// const Note = mongoose.model<INote>("Note", noteSchema);
