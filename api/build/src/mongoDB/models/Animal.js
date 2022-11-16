"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalSchema = exports.ESex = exports.ETypeOfAnimal = void 0;
const mongoose_1 = require("mongoose");
var ETypeOfAnimal;
(function (ETypeOfAnimal) {
    ETypeOfAnimal["Novillo"] = "Novillo";
    ETypeOfAnimal["Toro"] = "Toro";
    ETypeOfAnimal["Vaquillona"] = "Vaquillona";
    ETypeOfAnimal["Vaca"] = "Vaca";
})(ETypeOfAnimal = exports.ETypeOfAnimal || (exports.ETypeOfAnimal = {}));
var ESex;
(function (ESex) {
    ESex["macho"] = "macho";
    ESex["hembra"] = "hembra";
})(ESex = exports.ESex || (exports.ESex = {}));
exports.animalSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    id_senasa: { type: String, required: true, inmutable: true, maxlength: 40 },
    type_of_animal: { type: String, enum: ETypeOfAnimal, required: true },
    breed_name: { type: String, required: false, maxlength: 60 },
    sex: { type: String, enum: ESex },
    location: String,
    weight_kg: { type: Number, min: 0, max: 3000 },
    name: {
        type: String,
        lowercase: true,
        maxLength: 50,
        required: false,
        default: "sin nombre",
    },
    device_type: { type: String, required: true, maxlength: 30 },
    device_number: { type: String, required: true },
    comments: { type: String, required: false, maxlength: 800 },
    images: [String],
    birthday: { type: Date, required: false },
    is_pregnant: { type: Boolean, default: false, required: false },
    delivery_date: { type: Date, required: false },
    UserId: { type: String, ref: "User", required: true }, //! ref "User"
    // UserId: { type: String, required: true, reference: "User" },
}, { timestamps: true });
