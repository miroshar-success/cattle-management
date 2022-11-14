"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotesFromUser = void 0;
const setup_1 = require("../../mongoDB/setup");
function getAllNotesFromUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userFound = yield setup_1.User.findById(userId);
            if (userFound !== null) {
                let allNotesFromUser = userFound.notes;
                return allNotesFromUser;
            }
            throw new Error(`No se encontró al usuario en la base de datos.`);
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.getAllNotesFromUser = getAllNotesFromUser;
