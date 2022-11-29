"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotesFromUser = void 0;
const mongoDB_1 = require("../../mongoDB/");
async function getAllNotesFromUser(userId) {
    try {
        let userFound = await mongoDB_1.User.findById(userId);
        if (userFound === null) {
            throw new Error(`El usuario con id '${userId}' no está registrado en la base de datos.`);
        }
        else {
            let allNotesFromUser = userFound.notes;
            return allNotesFromUser;
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.getAllNotesFromUser = getAllNotesFromUser;
