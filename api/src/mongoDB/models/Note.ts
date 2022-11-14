import { Types, Schema } from "mongoose";

export interface INote {
  _id: Types.ObjectId;
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
