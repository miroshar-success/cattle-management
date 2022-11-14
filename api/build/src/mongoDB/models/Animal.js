"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalSchema = exports.ITypeOfAnimal = void 0;
const mongoose_1 = require("mongoose");
var ITypeOfAnimal;
(function (ITypeOfAnimal) {
    ITypeOfAnimal["Novillo"] = "Novillo";
    ITypeOfAnimal["Toro"] = "Toro";
    ITypeOfAnimal["Vaquillona"] = "Vaquillona";
    ITypeOfAnimal["Vaca"] = "Vaca";
})(ITypeOfAnimal = exports.ITypeOfAnimal || (exports.ITypeOfAnimal = {}));
exports.animalSchema = new mongoose_1.Schema({
    // _id: { type: String, required: true },
    id_senasa: { type: String, required: true },
    type_of_animal: { type: String, required: true },
    breed_name: { type: String, required: false },
    location: String,
    weight_kg: { type: Number, min: 0, max: 3000 },
    name: { type: String, lowercase: true, maxLength: 50, required: false },
    device_type: { type: String, required: true },
    device_number: { type: String, required: true },
    comments: { type: String, required: false, maxLength: 700 },
    images: [String],
    birthday: { type: Date, required: false },
    is_pregnant: Boolean,
    delivery_date: { type: Date, required: false },
    UserId: { type: String, required: true },
    // UserId: { type: String, required: true, reference: "User" },
}, { timestamps: true });
