"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdateNoteRequest = exports.handleDeleteNoteRequest = exports.handleGetAllNotesFromUser = exports.handleCreateNewNote = void 0;
const note_validators_1 = require("../../validators/note-validators");
const note_r_auxiliary_1 = require("./note-r-auxiliary");
const mongoDB_1 = require("../../mongoDB/");
// POST NEW NOTE :
async function handleCreateNewNote(req, res) {
    var _a;
    try {
        console.log("NEW NOTE BODY = ", req.body);
        const user_id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
        let validatedNoteObj = (0, note_validators_1.validateNewNoteMDB)(req.body);
        console.log("Nota validada...");
        // const newNote = await db.Note.create(validatedNoteObj);
        let userInDB = await mongoDB_1.User.findById(user_id);
        if (userInDB) {
            console.log("usuario encontrado por id...");
            console.log(userInDB);
            let nuevaNota = await mongoDB_1.Note.create(validatedNoteObj);
            console.log("Nueva nota = ", nuevaNota);
            userInDB.notes.push(nuevaNota);
            console.log("nota pusheada...");
            await userInDB.save();
            return res.status(201).send(validatedNoteObj);
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
    var _a;
    try {
        const noteIdFromParams = req.params.id;
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
        if (!noteIdFromParams) {
            throw new Error(`Error. Debe ingresar un id por params.`);
        }
        let response = {
            noteInDB: 0,
            userNote: 0,
            total: 0,
            status: false,
            msg: "",
        };
        const noteInDB = await mongoDB_1.Note.findByIdAndDelete(noteIdFromParams);
        if (noteInDB) {
            response.noteInDB++;
            response.total++;
        }
        const userInDB = await mongoDB_1.User.findById(userId);
        if (userInDB) {
            let noteFound = userInDB.notes.id(noteIdFromParams);
            if (noteFound) {
                console.log("NOTE FOUND = ", noteFound);
                noteFound.remove();
                await userInDB.save();
                console.log("Documento borrado.");
                // userInDB.notes.id(noteIdFromParams)?.remove();
                // console.log(userInDB);
                response.userNote++;
                response.total++;
                response.status = true;
                return res.status(200).send(response);
            }
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
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
        let response = {
            noteInDB: 0,
            userNote: 0,
            total: 0,
            status: false,
            msg: "",
        };
        const validatedNote = (0, note_validators_1.validateNewNoteMDB)(req.body);
        let noteInDB = await mongoDB_1.Note.findByIdAndUpdate(noteId, validatedNote);
        if (noteInDB) {
            response.noteInDB++;
            response.total++;
        }
        let userInDB = await mongoDB_1.User.findById(userId);
        if (userInDB) {
            let noteToUpdate = userInDB.notes.id(noteId);
            if (noteToUpdate) {
                noteToUpdate.title = validatedNote.title;
                noteToUpdate.comment = validatedNote.comment;
                noteToUpdate.theme = validatedNote.theme;
                noteToUpdate.importance = validatedNote.importance;
                console.log("noteToUpdate Updated = ", noteToUpdate);
                await userInDB.save();
                response.userNote++;
                response.total++;
                response.status = true;
                return res.status(201).send(response);
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
