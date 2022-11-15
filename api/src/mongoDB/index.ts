import LogWithColors from "../miscellanea/LogWithColor";

import mongoose from "mongoose";
//* - - - - - - - CONNECT TO MongoDB - - - - - - - -
import { config } from "../config/configMDB";

mongoose
  .connect(config.mongo.url)
  .then(() => {
    LogWithColors.info(" *** Connected to MongoDB! *** ");
  })
  .catch((error: any) => {
    LogWithColors.error("*** Unable to connecto to MongoDB");
    LogWithColors.error(error);
  });

//* - - - - - - - - MODELS : - - - - - - - -
import { noteSchema } from "./models/Note";
import { userSchema } from "./models/User";
import { animalSchema } from "./models/Animal";

export const User = mongoose.model("User", userSchema);
export const Animal = mongoose.model("Animal", animalSchema);
export const Note = mongoose.model("Note", noteSchema);

LogWithColors.info(
  " **************** MongoDB INDEX running! **************** "
);
