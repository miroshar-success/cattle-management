"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const express_1 = require("express");
const user_r_auxiliary_1 = require("../user/user-r-auxiliary");
const note_validators_1 = require("../../validators/note-validators");
const note_r_auxiliary_1 = require("./note-r-auxiliary");
const mongoDB_1 = require("../../mongoDB/");
const router = (0, express_1.Router)();
// - - - - - - - - - - RUTAS : - - - - - - - - - -
// POST NEW NOTE :
router.post("/newNote", jwtMiddleware_1.default, async (req, res) => {
    var _a;
    try {
        console.log("NEW NOTE BODY = ", req.body);
        const reqAuth = req.auth;
        const user_id = reqAuth.sub;
        (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(user_id);
        let checkedNoteObj = (0, note_validators_1.validateNewNoteMDB)(req.body);
        console.log("Nota validada...");
        // const newNote = await db.Note.create(checkedNoteObj);
        let notesOwner = await mongoDB_1.User.findById(user_id);
        if (notesOwner) {
            console.log("usuario encontrado por id...");
            console.log(notesOwner);
            let nuevaNota = await mongoDB_1.Note.create(checkedNoteObj);
            console.log("Nueva nota = ", nuevaNota);
            (_a = notesOwner === null || notesOwner === void 0 ? void 0 : notesOwner.notes) === null || _a === void 0 ? void 0 : _a.push(nuevaNota);
            console.log("nota pusheada...");
            await notesOwner.save();
            return res.status(201).send(checkedNoteObj);
        }
        else {
            return res
                .status(404)
                .send({ error: "No se encontró al usuario en la base de datos." });
        }
    }
    catch (error) {
        console.log(`Error en ruta  POST 'note/newNote'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
// GET ALL NOTES FROM USER :
router.get("/all", jwtMiddleware_1.default, async (req, res) => {
    try {
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        const allNotesFromUser = await (0, note_r_auxiliary_1.getAllNotesFromUser)(userId);
        return res.status(200).send(allNotesFromUser);
    }
    catch (error) {
        console.log(`Error en ruta GET 'note/all'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
// DELETE NOTE :
router.delete("/:id", jwtMiddleware_1.default, async (req, res) => {
    var _a;
    console.log(`EN RUTA DELETE :ID`);
    try {
        const noteIdFromParams = req.params.id;
        console.log("noteIdFromParams = ", noteIdFromParams);
        if (!noteIdFromParams) {
            throw new Error(`Error. Debe ingresar un id por params.`);
        }
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        let userInDB = await mongoDB_1.User.findById(userId);
        if (userInDB) {
            let noteFound = userInDB.notes.id(noteIdFromParams);
            console.log("NOTE FOUND = ", noteFound);
            (_a = userInDB.notes.id(noteIdFromParams)) === null || _a === void 0 ? void 0 : _a.remove();
            await userInDB.save();
            console.log("Documento borrado.");
            // console.log(userInDB);
            return res
                .status(200)
                .send({ msg: "Nota eliminada exitosamente", status: true });
        }
        else {
            throw new Error("Usuario no encontrado en la base de datos.");
        }
    }
    catch (error) {
        console.log(`Error en ruta DELETE '/note/:id. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
// UPDATE NOTE :
router.put("/", jwtMiddleware_1.default, async (req, res) => {
    try {
        console.log(req.body);
        const noteId = req.body._id;
        console.log("NOTE ID = ", noteId);
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        await (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        const validatedNote = (0, note_validators_1.validateNewNoteMDB)(req.body);
        let foundUser = await mongoDB_1.User.findById(userId);
        if (foundUser) {
            let noteToUpdate = foundUser === null || foundUser === void 0 ? void 0 : foundUser.notes.id(noteId);
            if (noteToUpdate) {
                noteToUpdate.title = validatedNote.title;
                noteToUpdate.comment = validatedNote.comment;
                noteToUpdate.theme = validatedNote.theme;
                noteToUpdate.importance = validatedNote.importance;
                console.log("noteToUpdate Updated = ", noteToUpdate);
                await foundUser.save();
                console.log("USER AFTER SAVE = ", foundUser);
                return res.status(201).send({ updated: 1, msg: "Nota actualizada." });
            }
            else {
                throw new Error("Nota a editar no encontrada.");
            }
        }
        else {
            throw new Error("No se ha encontrado al usuario en la base de datos.");
        }
    }
    catch (error) {
        console.log(`Error en ruta PUT 'note/:id'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
exports.default = router;
