const MONGO_URI = require("./configENV");
const mongoose = require("mongoose");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profile_img: { type: String, required: false },
  animals: [],
  notes: [],
});

const noteSchema = new Schema({
  title: String,
  theme: String,
  comment: String,
  importance: String,
});

const User = mongoose.model("User", userSchema);
const Note = mongoose.model("Note", noteSchema);

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
