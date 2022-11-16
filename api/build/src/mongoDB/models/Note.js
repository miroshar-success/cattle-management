"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteSchema = exports.EImportance = void 0;
const mongoose_1 = require("mongoose");
var EImportance;
(function (EImportance) {
    EImportance["alta"] = "alta";
    EImportance["media"] = "media";
    EImportance["baja"] = "baja";
})(EImportance = exports.EImportance || (exports.EImportance = {}));
exports.noteSchema = new mongoose_1.Schema({
    title: { type: String, required: false, maxlength: 40 },
    theme: { type: String, required: false, maxlength: 40 },
    comment: { type: String, required: true, maxlength: 250 },
    importance: {
        type: String,
        required: false,
    },
}, { timestamps: true });
// const Note = mongoose.model<INote>("Note", noteSchema);
