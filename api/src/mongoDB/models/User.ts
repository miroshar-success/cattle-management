import { Schema, HydratedDocument } from "mongoose";
import { animalSchema, IAnimal } from "./Animal";
import { INote, noteSchema } from "./Note";

export interface IUser {
  _id: string; //! Esto podría ser que me de problemas al momento de asignarle el id al usuario nuevo, que va a ser un string según el req.auth.sub
  name?: string | undefined;
  email: string;
  profile_img?: string;
  animals: [IAnimal];
  animalsPop: string[];
  notes: [HydratedDocument<INote>];
}

export interface INewUser {
  _id: string;
  name?: string | undefined;
  email: string;
  profile_img?: string;
  animals: [IAnimal] | [];
  animalsPop: string[] | [];
  notes: [HydratedDocument<INote>] | [];
}

export const userSchema: Schema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    profile_img: { type: String, required: false },
    animals: [animalSchema],
    animalsPop: [{ type: String, ref: "Animal" }],
    notes: [noteSchema],
  },
  { timestamps: true }
);

// export const User = mongoose.model<IUserModel>("User", userSchema);
