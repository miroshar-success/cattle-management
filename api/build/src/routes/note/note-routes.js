"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const express_1 = require("express");
const note_r_middlewares_1 = require("./note-r-middlewares");
const router = (0, express_1.Router)();
// - - - - - - - - - - RUTAS : - - - - - - - - - -
// CREATE NEW NOTE :
router.post("/newNote", jwtMiddleware_1.default, note_r_middlewares_1.handleCreateNewNote);
// GET ALL NOTES FROM USER :
router.get("/all", jwtMiddleware_1.default, note_r_middlewares_1.handleGetAllNotesFromUser);
// DELETE NOTE :
router.delete("/:id", jwtMiddleware_1.default, note_r_middlewares_1.handleDeleteNoteRequest);
// UPDATE NOTE :
router.put("/", jwtMiddleware_1.default, note_r_middlewares_1.handleUpdateNoteRequest);
exports.default = router;
