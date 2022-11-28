import LogWithColors from "../miscellanea/LogWithColor";

import mongoose from "mongoose";

//* - - - - - - - CONNECT TO MongoDB - - - - - - - -
const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    LogWithColors.info(" *** Connected to MongoDB! *** ");
  })
  .catch((error: any) => {
    LogWithColors.error("*** Unable to connecto to MongoDB");
    LogWithColors.error(error);
  });

//* - - - - - - - - MODELS : - - - - - - - -
import { INote, noteSchema } from "./models/Note";
import { IUser, userSchema } from "./models/User";
import { animalSchema, IAnimal } from "./models/Animal";

export const User = mongoose.model<IUser>("User", userSchema);
export const Animal = mongoose.model<IAnimal>("Animal", animalSchema);
export const Note = mongoose.model<INote>("Note", noteSchema);

LogWithColors.info(
  " **************** MongoDB INDEX running! **************** "
);
