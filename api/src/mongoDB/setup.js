const MONGO_URI = require("./configENV");
const mongoose = require("mongoose");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    // _id: String,
    title: String,
    theme: String,
    comment: String,
    importance: String,
  },
  { timestamps: true }
);

const animalSchema = new Schema(
  {
    _id: { type: String, required: true },
    type_of_animal: String,
    breed_name: String,
    location: String,
    weight_kg: Number,
    name: { type: String, lowercase: true },
    device_type: String,
    device_number: String,
    comments: String,
    images: [String],
    birthday: { type: Date, required: false },
    is_pregnant: Boolean,
    delivery_date: { type: Date, required: false },
    UserId: { type: String, required: true },
  },
  { timestamps: true }
);

const userSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  profile_img: { type: String, required: false },
  animals: [animalSchema],
  notes: [noteSchema],
});

export const User = mongoose.model("User", userSchema);
export const Note = mongoose.model("Note", noteSchema);
export const Animal = mongoose.model("Animal", animalSchema);
