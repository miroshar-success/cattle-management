"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPregnantInDeliveryDateOrder = exports.typesOfAnimalsToArray = void 0;
const Animal_1 = require("../../mongoDB/models/Animal");
const user_r_auxiliary_1 = require("../user/user-r-auxiliary");
//NOTA: La función auxiliar getStats está en un archivo aparte: ./getStatsAuxFn.ts
// Lo dejé en un archivo aparte ya que es bastante grande y adentro de este archivo se hace muy voluminoso todo.
// TYPES OF ANIMALS TO ARRAY :
function typesOfAnimalsToArray() {
    try {
        let typesParsedToArray = Object.values(Animal_1.ETypeOfAnimal);
        return typesParsedToArray;
    }
    catch (error) {
        console.log(`Error en fn typesOfAnimalsToArray. ${error.message}`);
        throw new Error(error.message);
    }
}
exports.typesOfAnimalsToArray = typesOfAnimalsToArray;
//GET PREGNANT IN DELIVERY ORDER :
async function getPregnantInDeliveryDateOrder(user_id) {
    const userInDB = await (0, user_r_auxiliary_1.getUserByIdOrThrowError)(user_id);
    const userAnimals = userInDB.animals;
    let filteredPregnant = userAnimals.filter((animal) => animal.is_pregnant === true);
    let copyOfFiltered = [...filteredPregnant];
    let sortedArray = copyOfFiltered.sort((a, b) => a.delivery_date - b.delivery_date);
    return {
        count: sortedArray.length,
        rows: sortedArray,
    };
}
exports.getPregnantInDeliveryDateOrder = getPregnantInDeliveryDateOrder;
