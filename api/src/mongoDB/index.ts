import mongoose from "mongoose";

//* ---- connect to MongoDB ------
import { config } from "../config/configMDB";
import LogWithColors from "./Logging";

mongoose
  .connect(config.mongo.url)
  .then(() => {
    LogWithColors.info(" *** Connected to MongoDB! *** ");
  })
  .catch((error: any) => {
    LogWithColors.error("*** Unable to connecto to MongoDB");
    LogWithColors.error(error);
  });

//* ---- Models : -----------------
import { INote, noteSchema } from "./models/Note";
import { IUser, userSchema } from "./models/User";
import { IAnimal, animalSchema } from "./models/Animal";

export const User = mongoose.model("User", userSchema);
export const Animal = mongoose.model("Animal", animalSchema);
export const Note = mongoose.model<INote>("Note", noteSchema);
// export const Note = mongoose.model("Note", noteSchema);

LogWithColors.info(
  " **************** MongoDB INDEX running! **************** "
);
