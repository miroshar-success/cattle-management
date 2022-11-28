import { Schema } from "mongoose";

export interface IAnimal {
  _id: string;
  id_senasa: string;
  type_of_animal: ETypeOfAnimal;
  breed_name?: string;
  sex: ESex;
  location?: string;
  weight_kg?: number;
  name?: string;
  device_type: string;
  device_number: string;
  comments?: string;
  images?: string[];
  birthday?: Date;
  is_pregnant?: boolean;
  delivery_date?: Date;
  UserId: string;
}

export enum ETypeOfAnimal {
  Novillo = "Novillo",
  Toro = "Toro",
  Vaquillona = "Vaquillona",
  Vaca = "Vaca",
}

export enum ESex {
  macho = "macho",
  hembra = "hembra",
}

export const animalSchema: Schema = new Schema<IAnimal>(
  {
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
    UserId: { type: String, ref: "User", required: true },
  },
  { timestamps: true }
);
