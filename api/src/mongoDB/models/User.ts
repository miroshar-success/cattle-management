import { Schema, Types } from "mongoose";
import { animalSchema, IAnimal } from "./Animal";
import { INote, noteSchema } from "./Note";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profile_img?: string;
  animals: Types.DocumentArray<IAnimal>;
  notes: Types.DocumentArray<INote>;
}

export interface INewUser {
  _id: string;
  name: string;
  email: string;
  profile_img?: string;
}

export const userSchema: Schema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, maxlength: 50 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      maxlength: 100,
    },
    profile_img: { type: String, required: false },
    animals: [animalSchema],
    notes: [noteSchema],
  },
  { timestamps: true }
);
