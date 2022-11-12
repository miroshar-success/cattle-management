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
const models_1 = __importDefault(require("../../models"));
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const express_1 = require("express");
const user_r_auxiliary_1 = require("../user/user-r-auxiliary");
const note_validators_1 = require("../../validators/note.validators");
const note_r_auxiliary_1 = require("./note-r-auxiliary");
const router = (0, express_1.Router)();
router.post("/newNote", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("NEW NOTE BODY = ", req.body);
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        let checkedNoteObj = (0, note_validators_1.validateNewNote)(req.body);
        const newNote = yield models_1.default.Note.create(checkedNoteObj);
        yield newNote.setUser(userId);
        console.log("Nueva nota asociada y creada: ", newNote.toJSON());
        return res.status(200).send(newNote);
    }
    catch (error) {
        console.log(`Eror en ruta  POST 'note/newNote'. ${error.message}`);
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
    try {
        const noteIdFromParams = req.params.id;
        if (!noteIdFromParams) {
            throw new Error(`Error. Debe ingresar un id por params.`);
        }
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        let deletedNote = yield models_1.default.Note.destroy({
            where: {
                id: noteIdFromParams,
                UserId: userId,
            },
        });
        console.log("DELETED NOTE = ", deletedNote);
        return res
            .status(200)
            .send({ msg: "Nota eliminada exitosamente", status: true });
    }
    catch (error) {
        console.log(`Error en ruta DELETE '/note/:id. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
router.put("/", jwtMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        yield (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        const validatedNote = (0, note_validators_1.validateNewNote)(req.body);
        let updatedNote = yield models_1.default.Note.update(Object.assign({}, validatedNote), {
            where: {
                id: validatedNote.id,
                UserId: userId,
            },
        });
        return res.status(200).send({
            updated: Number(updatedNote[0]),
            msg: `${updatedNote[0]} nota ha sido actualizada exitosamente.`,
        });
    }
    catch (error) {
        console.log(`Error en ruta PUT 'note/:id'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}));
exports.default = router;
