"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const mongoose = require("mongoose");
//? --- connect to mongo #1 ---
// const MONGO_URI = require("./configENV");
// mongoose.connect(
//   MONGO_URI,
//   () => {
//     console.log(`Conectado a MongoDB!`);
//   },
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );
//? ---- connect to MongoDB # 2------
const configMDB_1 = require("../config/configMDB");
const Logging_1 = __importDefault(require("./Logging"));
mongoose_1.default
    .connect(configMDB_1.config.mongo.url)
    .then(() => {
    Logging_1.default.info(" *** Connected to MongoDB! *** ");
})
    .catch((error) => {
    Logging_1.default.error("*** Unable to connecto to MongoDB");
    Logging_1.default.error(error);
});
// ----------------------
// const Schema = mongoose.Schema;
// --- prueba con NoteSchema :
// export interface INoteM {
//   title?: string;
//   theme?: string;
//   comment: string;
//   importance?: string;
// }
// export interface INoteModel extends INoteM, Document {}
// const noteSchema: Schema = new Schema(
//   {
//     // _id: String,
//     title: String,
//     theme: String,
//     comment: String,
//     importance: String,
//   },
//   { timestamps: true }
// );
// const animalSchema = new Schema(
//   {
//     _id: { type: String, required: true },
//     type_of_animal: { type: String, required: true },
//     breed_name: { type: String, required: false },
//     location: String,
//     weight_kg: { type: Number, min: 0, max: 3000 },
//     name: { type: String, lowercase: true, maxLength: 50, required: false },
//     device_type: { type: String, required: true },
//     device_number: { type: String, required: true },
//     comments: { type: String, required: false, maxLength: 700 },
//     images: [String],
//     birthday: { type: Date, required: false },
//     is_pregnant: Boolean,
//     delivery_date: { type: Date, required: false },
//     UserId: { type: String, required: true },
//   },
//   { timestamps: true }
// );
// const userSchema = new Schema({
//   _id: { type: String, required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true, lowercase: true },
//   profile_img: { type: String, required: false },
//   animals: [animalSchema],
//   notes: [noteSchema],
// });
// export const User = mongoose.model("User", userSchema);
// export const NoteTS = mongoose.model<INoteModel>("NoteTS", noteSchema);
// export const Note = mongoose.model("Note", noteSchema);
// export const Animal = mongoose.model("Animal", animalSchema);
