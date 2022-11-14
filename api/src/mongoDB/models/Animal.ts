import mongoose, { Schema } from "mongoose";

export interface IAnimal {
  // _id: string;
  id_senasa: string;
  type_of_animal: ITypeOfAnimal;
  breed_name?: string;
  location?: string;
  weight_kg?: number;
  name?: string;
  device_type: string;
  device_number: string;
  comments?: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  birthday?: string;
  is_pregnant?: boolean;
  delivery_date?: string;
}

export enum ITypeOfAnimal {
  Novillo = "Novillo",
  Toro = "Toro",
  Vaquillona = "Vaquillona",
  Vaca = "Vaca",
}

export const animalSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);
