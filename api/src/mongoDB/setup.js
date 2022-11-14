const MONGO_URI = require("./configENV");
const mongoose = require("mongoose");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  // _id: String,
  title: String,
  theme: String,
  comment: String,
  importance: String,
});

const animalSchema = new Schema({
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
});

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

// const createAndSavePerson = (done) => {
//   let eltonJohn = new Person({
//     name: "Elton John",
//     age: 32,
//     favoriteFoods: ["Arroz", "Pollo"],
//   });
//   eltonJohn.save(function (error, data) {
//     if (error) {
//       return console.log(error);
//     }
//     done(null, data);
//   });
// };

// var arrayOfPeople = [
//   { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
//   { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
//   { name: "Robert", age: 78, favoriteFoods: ["wine"] },
// ];

// const createManyPeople = (arrayOfPeople, done) => {
//   Person.create(arrayOfPeople, function (error, data) {
//     if (error) {
//       return console.log(error);
//     } else {
//       done(null, data);
//     }
//   });
// };
