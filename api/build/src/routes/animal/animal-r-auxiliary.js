"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjOfAnimalsByTypeOfAnimal = exports.getObjOfAnimalsBySex = exports.getObjOfAnimalsNotPregnant = exports.getObjOfAnimalsPregnant = exports.getObjOfAllAnimalsAndCount = exports.getObjOfAnimalsByDeviceType = exports.getObjOfAnimalsByLocation = exports.getObjOfAnimalsByRace = exports.getAndParseIsPregnantQuery = exports.typesOfAnimalsToArray = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const models_1 = __importDefault(require("../../models"));
const animal_types_1 = require("../../types/animal-types");
// TYPES OF ANIMALS TO ARRAY :
function typesOfAnimalsToArray() {
    try {
        let typesParsedToArray = Object.values(animal_types_1.ITypeOfAnimal);
        return typesParsedToArray;
    }
    catch (error) {
        console.log(`Error en fn typesOfAnimalsToArray. ${error.message}`);
        throw new Error(error.message);
    }
}
exports.typesOfAnimalsToArray = typesOfAnimalsToArray;
// GET AND PARSE IS PREGNANT QUERY
function getAndParseIsPregnantQuery(userId, status, order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Si status de is_pregnant es falso:
            if (!status) {
                const listOfAnimalsNotPregnant = yield models_1.default.Animal.findAll({
                    where: {
                        is_pregnant: false,
                        UserId: userId,
                    },
                });
                return {
                    listLength: listOfAnimalsNotPregnant.length,
                    list: listOfAnimalsNotPregnant,
                };
            }
            // Si order es un valor válido, buscar los animales que están embarazados y en orden:
            if (order === "ASC" || order === "DESC" || order === "NULLS FIRST") {
                const listOfAnimalsOrdered = yield models_1.default.Animal.findAll({
                    where: {
                        is_pregnant: true,
                        UserId: userId,
                    },
                    order: [["delivery_date", order]],
                });
                return {
                    listLength: listOfAnimalsOrdered.length,
                    list: listOfAnimalsOrdered,
                };
            }
            // Si el valor de orden es falsy, buscar todos los animales embarazados:
            if (!order && status === true) {
                const listOfAnimalsPregnant = yield models_1.default.Animal.findAll({
                    where: {
                        is_pregnant: status,
                        UserId: userId,
                    },
                });
                return {
                    listLength: listOfAnimalsPregnant.length,
                    list: listOfAnimalsPregnant,
                };
            }
        }
        catch (error) {
            console.log(`Error en fn aux getAndParseIsPregnantQuery. ${error.message}`);
            throw new Error(`Error al buscar y parsear con queries relacionados a animales preñados o no preñados.`);
        }
    });
}
exports.getAndParseIsPregnantQuery = getAndParseIsPregnantQuery;
// --------------AUX FNS PARA STATS : --------------------------
// GET OBJ OF ANIMALS BY RACE :
function getObjOfAnimalsByRace(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const breedNamesArrObjs = yield models_1.default.Animal.findAll({
                attributes: [
                    "breed_name",
                    [sequelize_1.default.fn("count", sequelize_1.default.col("breed_name")), "cnt"],
                ],
                group: ["breed_name"],
                where: {
                    UserId: userId,
                },
            });
            let arrayOfRaces = [];
            breedNamesArrObjs.forEach((elem) => {
                arrayOfRaces.push(elem.breed_name);
            });
            console.log("arrayOfRaces = ", arrayOfRaces);
            let objWithAnimalsByRaceAndCount = {};
            for (let i = 0; i < arrayOfRaces.length; i++) {
                objWithAnimalsByRaceAndCount = Object.assign(Object.assign({}, objWithAnimalsByRaceAndCount), { [arrayOfRaces[i]]: yield models_1.default.Animal.findAndCountAll({
                        where: {
                            breed_name: arrayOfRaces[i],
                            UserId: userId,
                        },
                    }) });
            }
            return objWithAnimalsByRaceAndCount;
        }
        catch (error) {
            console.log(`Error en fn aux getObjOfAnimalsByRace. ${error.message}`);
            // THROW NEW ERROR ?
        }
    });
}
exports.getObjOfAnimalsByRace = getObjOfAnimalsByRace;
// GET OBJ OF ANIMALS BY LOCATION :
function getObjOfAnimalsByLocation(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let objOfAnimalsByLocation = {};
            const locationsArrObjs = yield models_1.default.Animal.findAll({
                attributes: [
                    "location",
                    [sequelize_1.default.fn("count", sequelize_1.default.col("location")), "cnt"],
                ],
                group: ["location"],
                where: {
                    UserId: userId,
                },
            });
            // console.log(locationsArrObjs);
            let arrayOfLocations = [];
            locationsArrObjs.forEach((elem) => {
                arrayOfLocations.push(elem.location);
            });
            console.log("arrayOfLocations ", arrayOfLocations);
            for (let i = 0; i < arrayOfLocations.length; i++) {
                const element = arrayOfLocations[i];
                objOfAnimalsByLocation = Object.assign(Object.assign({}, objOfAnimalsByLocation), { [element]: yield models_1.default.Animal.findAndCountAll({
                        where: {
                            location: element,
                            UserId: userId,
                        },
                    }) });
            }
            return objOfAnimalsByLocation;
        }
        catch (error) {
            console.log(`Error en fn aux getObjOfAnimalsByLocation. ${error.message}`);
            // THROW NEW ERROR ?
        }
    });
}
exports.getObjOfAnimalsByLocation = getObjOfAnimalsByLocation;
// GET OBJ OF ANIMALS BY DEVICE TYPE :
function getObjOfAnimalsByDeviceType(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let objOfAnimalsByDeviceType = {};
            let deviceTypesArrObjs = yield models_1.default.Animal.findAll({
                attributes: [
                    "device_type",
                    [sequelize_1.default.fn("count", sequelize_1.default.col("device_type")), "cnt"],
                ],
                group: "device_type",
                where: {
                    UserId: userId,
                },
            });
            const deviceTypesArray = [];
            deviceTypesArrObjs.forEach((type) => {
                deviceTypesArray.push(type.device_type);
            });
            console.log(deviceTypesArray);
            for (let i = 0; i < deviceTypesArray.length; i++) {
                const element = deviceTypesArray[i];
                objOfAnimalsByDeviceType = Object.assign(Object.assign({}, objOfAnimalsByDeviceType), { [element]: yield models_1.default.Animal.findAndCountAll({
                        where: {
                            device_type: element,
                            UserId: userId,
                        },
                    }) });
            }
            console.log(objOfAnimalsByDeviceType);
            return objOfAnimalsByDeviceType;
        }
        catch (error) {
            console.log(`Error en aux function getObjOfAnimalsByDeviceType. ${error.message}`);
            // THROW NEW ERROR ?
        }
    });
}
exports.getObjOfAnimalsByDeviceType = getObjOfAnimalsByDeviceType;
// GET OBJ OF ALL ANIMALS AND COUNT :
function getObjOfAllAnimalsAndCount(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allAnimalsAndCount = yield models_1.default.Animal.findAndCountAll({
                where: {
                    UserId: userId,
                },
            });
            return allAnimalsAndCount;
        }
        catch (error) {
            console.log(`Error en aux function getObjOfAllAnimalsAndCount. ${error.message}`);
        }
    });
}
exports.getObjOfAllAnimalsAndCount = getObjOfAllAnimalsAndCount;
// GET OBJ OF ANIMALS PREGNANT :
function getObjOfAnimalsPregnant(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let objOfAnimalsPregnant = yield models_1.default.Animal.findAndCountAll({
                where: {
                    is_pregnant: true,
                    UserId: userId,
                },
            });
            return objOfAnimalsPregnant;
        }
        catch (error) {
            console.log(`Error en aux function getObjOfAnimalsPregnant. ${error.message}`);
            // THROW NEW ERROR ?
        }
    });
}
exports.getObjOfAnimalsPregnant = getObjOfAnimalsPregnant;
// GET OBJ OF ANIMALS NOT PREGNANT :
function getObjOfAnimalsNotPregnant(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let objOfAnimalsNotPregnant = yield models_1.default.Animal.findAndCountAll({
                where: {
                    [sequelize_1.Op.or]: [{ is_pregnant: false }, { is_pregnant: null }],
                    UserId: userId,
                },
            });
            return objOfAnimalsNotPregnant;
        }
        catch (error) {
            console.log(`Error en aux function getObjOfAnimalsNotPregnant. ${error.message}`);
            // THROW NEW ERROR ?
        }
    });
}
exports.getObjOfAnimalsNotPregnant = getObjOfAnimalsNotPregnant;
// GET OBJ OF ANIMALS BY SEX :
function getObjOfAnimalsBySex(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [femalePregnant, femaleNotPregnant, male, female] = yield Promise.all([
                models_1.default.Animal.findAndCountAll({
                    where: {
                        is_pregnant: true,
                        UserId: userId,
                    },
                    order: [["delivery_date", "ASC"]],
                }),
                models_1.default.Animal.findAndCountAll({
                    where: {
                        [sequelize_1.Op.or]: [
                            { type_of_animal: animal_types_1.ITypeOfAnimal.Vaca },
                            { type_of_animal: animal_types_1.ITypeOfAnimal.Vaquillona },
                        ],
                        is_pregnant: false,
                        UserId: userId,
                    },
                }),
                models_1.default.Animal.findAndCountAll({
                    where: {
                        [sequelize_1.Op.or]: [
                            { type_of_animal: animal_types_1.ITypeOfAnimal.Toro },
                            { type_of_animal: animal_types_1.ITypeOfAnimal.Novillo },
                        ],
                        UserId: userId,
                    },
                }),
                models_1.default.Animal.findAndCountAll({
                    where: {
                        [sequelize_1.Op.or]: [
                            { type_of_animal: animal_types_1.ITypeOfAnimal.Vaca },
                            { type_of_animal: animal_types_1.ITypeOfAnimal.Vaquillona },
                        ],
                        UserId: userId,
                    },
                }),
            ]);
            let objOfAnimalsBySex = {
                male: male,
                female: female,
                femalePregnant: femalePregnant,
                femaleNotPregnant: femaleNotPregnant,
            };
            return objOfAnimalsBySex;
        }
        catch (error) {
            console.log(`Error en fn aux getObjOfAnimalsBySex. ${error.message}`);
        }
    });
}
exports.getObjOfAnimalsBySex = getObjOfAnimalsBySex;
// GET OBJ OF ANIMALS BY TYPE OF ANIMAL :
function getObjOfAnimalsByTypeOfAnimal(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let objOfAnimalsByType = {};
            let arrayDeTiposDeAnimales = Object.values(animal_types_1.ITypeOfAnimal);
            console.log(arrayDeTiposDeAnimales);
            for (let i = 0; i < arrayDeTiposDeAnimales.length; i++) {
                const element = arrayDeTiposDeAnimales[i];
                objOfAnimalsByType = Object.assign(Object.assign({}, objOfAnimalsByType), { [element]: yield models_1.default.Animal.findAndCountAll({
                        where: {
                            type_of_animal: element,
                            UserId: userId,
                        },
                    }) });
                if (element == animal_types_1.ITypeOfAnimal.Vaquillona ||
                    element === animal_types_1.ITypeOfAnimal.Vaca) {
                    let femaleAnimalsPregnant = yield models_1.default.Animal.findAndCountAll({
                        where: {
                            is_pregnant: true,
                            type_of_animal: element,
                            UserId: userId,
                        },
                        order: [["delivery_date", "ASC"]],
                    });
                    objOfAnimalsByType[element].pregnant = femaleAnimalsPregnant;
                }
            }
            return objOfAnimalsByType;
        }
        catch (error) {
            console.log(`Error en aux function getObjOfAnimalsByDeviceType. ${error.message}`);
        }
    });
}
exports.getObjOfAnimalsByTypeOfAnimal = getObjOfAnimalsByTypeOfAnimal;
//! ------------------------------
const stats = {
    numberOfTotalAnimals: 211,
    pregnant: { count: 11, rows: [{}, {}] },
    notPregnant: { count: 76, rows: [{}, {}, {}] },
    races: {
        ["Angus"]: { count: 3, rows: [{}, {}, {}, {}] },
        ["Criolla"]: { count: 2, rows: [{}, {}] },
        ["Sin especificar"]: { count: 2, rows: [{}, {}] },
    },
    types: {
        ["Vaquillona"]: {
            count: 53,
            rows: [{}, {}, {}, {}, {}],
            pregnants: 11,
        },
        ["Toro"]: { count: 8, rows: [{}, {}] },
        ["Novillo"]: { count: 13, rows: [{}, {}, {}] },
    },
    location: {
        ["Sector 2"]: { count: 7, rows: [{}, {}, {}] },
        ["Lote-4"]: { count: 2, rows: [{}, {}] },
        ["Sin especificar"]: { count: 4, rows: [{}, {}] },
    },
    deviceType: {
        ["Ear Tag"]: { count: 34, rows: [{}, {}, {}, {}] },
        ["Collar"]: { count: 9, rows: [{}, {}] },
    },
};
