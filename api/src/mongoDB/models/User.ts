import { Schema } from "mongoose";
import { animalSchema, IAnimal } from "./Animal";
import { INote, noteSchema } from "./Note";

export interface IUser {
  _id: string; //! Esto podría ser que me de problemas al momento de asignarle el id al usuario nuevo, que va a ser un string según el req.auth.sub
  name?: string | undefined;
  email: string;
  profile_img?: string;
  animals: [IAnimal];
  notes: [INote];
}

// export interface IUserModel extends IUser {}

export const userSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  profile_img: { type: String, required: false },
  animals: [animalSchema],
  notes: [noteSchema],
});

// export const User = mongoose.model<IUserModel>("User", userSchema);
