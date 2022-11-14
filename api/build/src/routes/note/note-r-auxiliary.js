"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotesFromUser = void 0;
const mongoDB_1 = require("../../mongoDB/");
async function getAllNotesFromUser(userId) {
    try {
        let userFound = await mongoDB_1.User.findById(userId);
        if (userFound !== null) {
            let allNotesFromUser = userFound.notes;
            return allNotesFromUser;
        }
        throw new Error(`No se encontró al usuario en la base de datos.`);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.getAllNotesFromUser = getAllNotesFromUser;
