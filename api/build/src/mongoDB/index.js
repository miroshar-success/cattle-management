"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.Animal = exports.User = void 0;
const LogWithColor_1 = __importDefault(require("../miscellanea/LogWithColor"));
const mongoose_1 = __importDefault(require("mongoose"));
//* - - - - - - - CONNECT TO MongoDB - - - - - - - -
const configMDB_1 = require("../config/configMDB");
mongoose_1.default
    .connect(configMDB_1.config.mongo.url)
    .then(() => {
    LogWithColor_1.default.info(" *** Connected to MongoDB! *** ");
})
    .catch((error) => {
    LogWithColor_1.default.error("*** Unable to connecto to MongoDB");
    LogWithColor_1.default.error(error);
});
//* - - - - - - - - MODELS : - - - - - - - -
const Note_1 = require("./models/Note");
const User_1 = require("./models/User");
const Animal_1 = require("./models/Animal");
exports.User = mongoose_1.default.model("User", User_1.userSchema);
exports.Animal = mongoose_1.default.model("Animal", Animal_1.animalSchema);
exports.Note = mongoose_1.default.model("Note", Note_1.noteSchema);
LogWithColor_1.default.info(" **************** MongoDB INDEX running! **************** ");
