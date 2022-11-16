"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const Animal_1 = require("./Animal");
const Note_1 = require("./Note");
exports.userSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true, maxlength: 50 },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        maxlength: 100,
    },
    profile_img: { type: String, required: false },
    animals: [Animal_1.animalSchema],
    animalsPop: [{ type: String, ref: "Animal" }],
    notes: [Note_1.noteSchema],
}, { timestamps: true });
// export const User = mongoose.model<IUserModel>("User", userSchema);
