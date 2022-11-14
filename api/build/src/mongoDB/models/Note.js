"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.noteSchema = new mongoose_1.Schema({
    // _id: String,
    title: String,
    theme: String,
    comment: { type: String, required: true },
    importance: String,
}, { timestamps: true });
// const Note = mongoose.model<INote>("Note", noteSchema);
