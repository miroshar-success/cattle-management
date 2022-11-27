"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdateNoteRequest = exports.handleDeleteNoteRequest = exports.handleGetAllNotesFromUser = exports.handleCreateNewNote = void 0;
const user_r_auxiliary_1 = require("../user/user-r-auxiliary");
const note_validators_1 = require("../../validators/note-validators");
const note_r_auxiliary_1 = require("./note-r-auxiliary");
const mongoDB_1 = require("../../mongoDB/");
// POST NEW NOTE :
async function handleCreateNewNote(req, res) {
    var _a, _b;
    try {
        console.log("NEW NOTE BODY = ", req.body);
        const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
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
            (_b = notesOwner === null || notesOwner === void 0 ? void 0 : notesOwner.notes) === null || _b === void 0 ? void 0 : _b.push(nuevaNota);
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
}
exports.handleCreateNewNote = handleCreateNewNote;
// GET ALL NOTES FROM USER :
async function handleGetAllNotesFromUser(req, res) {
    var _a;
    try {
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
        if (!userId) {
            throw new Error("El user id no puede ser falso.");
        }
        (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        const allNotesFromUser = await (0, note_r_auxiliary_1.getAllNotesFromUser)(userId);
        return res.status(200).send(allNotesFromUser);
    }
    catch (error) {
        console.log(`Error en ruta GET 'note/all'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}
exports.handleGetAllNotesFromUser = handleGetAllNotesFromUser;
// DELETE NOTE :
async function handleDeleteNoteRequest(req, res) {
    var _a, _b;
    try {
        const noteIdFromParams = req.params.id;
        console.log("noteIdFromParams = ", noteIdFromParams);
        if (!noteIdFromParams) {
            throw new Error(`Error. Debe ingresar un id por params.`);
        }
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
        let userInDB = await mongoDB_1.User.findById(userId);
        if (userInDB) {
            let noteFound = userInDB.notes.id(noteIdFromParams);
            console.log("NOTE FOUND = ", noteFound);
            (_b = userInDB.notes.id(noteIdFromParams)) === null || _b === void 0 ? void 0 : _b.remove();
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
}
exports.handleDeleteNoteRequest = handleDeleteNoteRequest;
// UPDATE NOTE :
async function handleUpdateNoteRequest(req, res) {
    var _a;
    try {
        console.log(req.body);
        const noteId = req.body._id;
        console.log("NOTE ID = ", noteId);
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
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
}
exports.handleUpdateNoteRequest = handleUpdateNoteRequest;
