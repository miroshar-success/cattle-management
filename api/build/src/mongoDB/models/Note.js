"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteSchema = exports.EImportance = void 0;
const mongoose_1 = require("mongoose");
var EImportance;
(function (EImportance) {
    EImportance["Alta"] = "Alta";
    EImportance["Media"] = "Media";
    EImportance["Baja"] = "Baja";
})(EImportance = exports.EImportance || (exports.EImportance = {}));
exports.noteSchema = new mongoose_1.Schema({
    // _id: String,
    title: String,
    theme: String,
    comment: { type: String, required: true },
    importance: String,
}, { timestamps: true });
// const Note = mongoose.model<INote>("Note", noteSchema);
