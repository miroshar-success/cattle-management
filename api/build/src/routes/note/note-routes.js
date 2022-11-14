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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const express_1 = require("express");
const user_r_auxiliary_1 = require("../user/user-r-auxiliary");
const note_validators_1 = require("../../validators/note-validators");
const note_r_auxiliary_1 = require("./note-r-auxiliary");
const setup_1 = require("../../mongoDB/setup");
const router = (0, express_1.Router)();
router.post("/newNote", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("NEW NOTE BODY = ", req.body);
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        let checkedNoteObj = (0, note_validators_1.validateNewNoteMDB)(req.body);
        console.log("Nota validada...");
        // const newNote = await db.Note.create(checkedNoteObj);
        let notesOwner = yield setup_1.User.findById(userId);
        if (notesOwner) {
            console.log("usuario encontrado por id...");
            console.log(notesOwner);
            let nuevaNota = yield setup_1.Note.create(checkedNoteObj);
            console.log("Nueva nota = ", nuevaNota);
            (_a = notesOwner === null || notesOwner === void 0 ? void 0 : notesOwner.notes) === null || _a === void 0 ? void 0 : _a.push(nuevaNota);
            console.log("nota pusheada...");
            yield notesOwner.save();
            // await newNote.setUser(userId);
            // console.log("Nueva nota asociada y creada: ", newNote.toJSON());
            return res.status(200).send(checkedNoteObj);
        }
        else {
            return res
                .status(400)
                .send({ error: "No se encontró al usuario en la base de datos." });
        }
    }
    catch (error) {
        console.log(`Error en ruta  POST 'note/newNote'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
router.get("/all", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        const allNotesFromUser = yield (0, note_r_auxiliary_1.getAllNotesFromUser)(userId);
        return res.status(200).send(allNotesFromUser);
    }
    catch (error) {
        console.log(`Error en ruta GET 'note/all'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
router.delete("/:id", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    console.log(`EN RUTA DELETE :ID`);
    try {
        const noteIdFromParams = req.params.id;
        console.log("noteIdFromParams = ", noteIdFromParams);
        if (!noteIdFromParams) {
            throw new Error(`Error. Debe ingresar un id por params.`);
        }
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        let userInDB = yield setup_1.User.findById(userId);
        if (userInDB) {
            let noteFound = userInDB.notes.id(noteIdFromParams);
            console.log("NOTE FOUND = ", noteFound);
            (_b = userInDB.notes.id(noteIdFromParams)) === null || _b === void 0 ? void 0 : _b.remove();
            yield userInDB.save();
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
}));
// router.delete("/:id", jwtCheck, async (req: any, res) => {
//   try {
//     const noteIdFromParams = req.params.id;
//     if (!noteIdFromParams) {
//       throw new Error(`Error. Debe ingresar un id por params.`);
//     }
//     const reqAuth: IReqAuth = req.auth;
//     const userId: string = reqAuth.sub;
//     let deletedNote = await db.Note.destroy({
//       where: {
//         id: noteIdFromParams,
//         UserId: userId,
//       },
//     });
//     console.log("DELETED NOTE = ", deletedNote);
//     return res
//       .status(200)
//       .send({ msg: "Nota eliminada exitosamente", status: true });
//   } catch (error: any) {
//     console.log(`Error en ruta DELETE '/note/:id. ${error.message}`);
//     return res.status(400).send({ error: error.message });
//   }
// });
router.put("/", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const noteId = req.body._id;
        console.log("NOTE ID = ", noteId);
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        yield (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        const validatedNote = (0, note_validators_1.validateNewNoteMDB)(req.body);
        let foundUser = yield setup_1.User.findById(userId);
        if (foundUser) {
            let noteToUpdate = foundUser === null || foundUser === void 0 ? void 0 : foundUser.notes.id(noteId);
            if (noteToUpdate) {
                noteToUpdate.title = req.body.title;
                noteToUpdate.comment = req.body.comment;
                noteToUpdate.theme = req.body.theme;
                noteToUpdate.importance = req.body.importance;
                console.log("noteToUpdate Updated = ", noteToUpdate);
                yield foundUser.save();
            }
            console.log("USER AFTER SAVE = ", foundUser);
            return res.status(200).send({ updated: 1, msg: "Notaaaa ddbb MOngoo" });
        }
        else {
            throw new Error("No se ha encontrado al usuario en la base de datos.");
        }
    }
    catch (error) {
        console.log(`Error en ruta PUT 'note/:id'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
