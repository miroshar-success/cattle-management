"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const animal_validators_1 = require("../../validators/animal-validators");
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const express_1 = require("express");
const user_r_auxiliary_1 = require("../user/user-r-auxiliary");
const animal_r_auxiliary_1 = require("./animal-r-auxiliary");
// MDB:
const mongoDB_1 = require("../../mongoDB");
const getStatsAuxFn_1 = require("./getStatsAuxFn");
const router = (0, express_1.Router)();
// ------- RUTAS MONGO MONGOOSE : ---------
// GET STATS EVO DEFINITIVE :
router.get("/stats", jwtMiddleware_1.default, async (req, res) => {
    try {
        const reqAuth = req.auth;
        const user_id = reqAuth.sub;
        const stats = await (0, getStatsAuxFn_1.getStatsObjEvo)(user_id);
        console.log(`Devolviendo objeto stats...`);
        return res.status(200).send(stats);
    }
    catch (error) {
        console.log(`Error en GET 'animal/stats'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
// GET ALL ANIMALS FROM USER :
router.get("/", jwtMiddleware_1.default, async (req, res) => {
    try {
        const reqAuth = req.auth;
        const user_id = reqAuth.sub;
        const userInDB = await (0, user_r_auxiliary_1.getUserByIdOrThrowError)(user_id);
        let animalsFromUser = userInDB.animals;
        return res.status(200).send(animalsFromUser);
    }
    catch (error) {
        console.log(`Error en "/animal/". ${error.message}`);
        return res.send({ error: error.message });
    }
});
// POST NEW ANIMAL:
router.post("/", jwtMiddleware_1.default, async (req, res) => {
    try {
        const reqAuth = req.auth;
        const user_id = reqAuth.sub;
        const userInDB = await (0, user_r_auxiliary_1.getUserByIdOrThrowError)(user_id);
        console.log(`REQ.BODY = `);
        console.log(req.body);
        const validatedNewAnimal = (0, animal_validators_1.checkAnimal)(Object.assign(Object.assign({}, req.body), { user_id }));
        const newAnimalCreated = await mongoDB_1.Animal.create(validatedNewAnimal);
        userInDB === null || userInDB === void 0 ? void 0 : userInDB.animals.push(newAnimalCreated);
        userInDB.animalsPop.push(newAnimalCreated._id);
        await userInDB.save();
        console.log(`nuevo animal creado y pusheado al usuario con id ${user_id}`);
        return res
            .status(200)
            .send({ msg: "Animal creado correctamente.", animal: newAnimalCreated });
    }
    catch (error) {
        console.log(`Error en POST 'user/'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
// DELETE ANIMAL :
router.delete("/delete/:id_senasa", jwtMiddleware_1.default, async (req, res) => {
    var _a;
    try {
        const reqAuth = req.auth;
        const user_id = reqAuth.sub;
        const id_senasaFromParams = req.params.id_senasa;
        if (!id_senasaFromParams) {
            throw new Error(`El id de SENASA es falso.`);
        }
        let userInDB = await (0, user_r_auxiliary_1.getUserByIdOrThrowError)(user_id);
        if (userInDB === null) {
            throw new Error(`Usuario con id '${user_id}'no encontrado en la base de datos.`);
        }
        await ((_a = userInDB.animals.id(id_senasaFromParams)) === null || _a === void 0 ? void 0 : _a.remove());
        await userInDB.save();
        return res
            .status(200)
            .send({ msg: "Animal eliminado exitosamente", status: true });
    }
    catch (error) {
        console.log(`Error en DELETE por id. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
// GET BY ID_SENASA :
router.get("/id/:id_senasa", jwtMiddleware_1.default, async (req, res) => {
    try {
        const { id_senasa } = req.params;
        const reqAuth = req.auth;
        const user_id = reqAuth.sub;
        const userInDB = await (0, user_r_auxiliary_1.getUserByIdOrThrowError)(user_id);
        let foundAnimal = userInDB.animals.id(id_senasa);
        if (foundAnimal) {
            return res.status(200).send(foundAnimal);
        }
        else {
            return res.status(404).send({
                error: `No se encontró ningún registro con el id '${id_senasa}'.`,
            });
        }
    }
    catch (error) {
        console.log(`Error en GET "/:id_senasa". ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
// UPDATE ANIMAL :
router.put("/", jwtMiddleware_1.default, async (req, res) => {
    try {
        console.log(`REQ.BODY = `);
        console.log(req.body);
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        const userInDB = await (0, user_r_auxiliary_1.getUserByIdOrThrowError)(userId);
        const validatedAnimal = (0, animal_validators_1.checkAnimal)(Object.assign(Object.assign({}, req.body), { userId }));
        let foundAnimal = userInDB.animals.id(validatedAnimal._id);
        foundAnimal.type_of_animal = validatedAnimal.type_of_animal;
        foundAnimal.breed_name = validatedAnimal.breed_name;
        foundAnimal.location = validatedAnimal.location;
        foundAnimal.weight_kg = validatedAnimal.weight_kg;
        foundAnimal.name = validatedAnimal.name;
        foundAnimal.device_type = validatedAnimal.device_type;
        foundAnimal.device_number = validatedAnimal.device_number;
        foundAnimal.images = validatedAnimal.images;
        foundAnimal.comments = validatedAnimal.comments;
        foundAnimal.birthday = validatedAnimal.birthday;
        foundAnimal.is_pregnant = validatedAnimal.is_pregnant;
        foundAnimal.delivery_date = validatedAnimal.delivery_date;
        foundAnimal.sex = validatedAnimal.sex;
        await userInDB.save();
        console.log(`Animal actualizado. Retornando respuesta...`);
        return res.send({
            updated: Number(1),
            msg: `Cantidad de animales actualizados correctamente: ${1}`,
        });
    }
    catch (error) {
        console.log(`Error en PUT "/animal". ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
// GET TYPES OF ANIMAL ACCEPTED :
router.get("/typesAllowed", async (req, res) => {
    try {
        let typesOfAnimalsArray = (0, animal_r_auxiliary_1.typesOfAnimalsToArray)();
        return res.status(200).send(typesOfAnimalsArray);
    }
    catch (error) {
        console.log(`Error en GET 'animal/typesAllowed. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
// SEARCH BY QUERY :
router.get("/search", jwtMiddleware_1.default, async (req, res) => {
    try {
        let queryValue = req.query.value;
        const reqAuth = req.auth;
        const user_id = reqAuth.sub;
        if (typeof queryValue === "string") {
            queryValue = queryValue.toLowerCase();
        }
        // buscar coincidencias adentro de User con forEach :
        const userInDB = await (0, user_r_auxiliary_1.getUserByIdOrThrowError)(user_id);
        if (userInDB === null) {
            throw new Error("Usuario no encontrado");
        }
        const userAnimals = userInDB.animals;
        let animalesMatched = [];
        userAnimals.forEach((element) => {
            var _a, _b, _c;
            if (((_a = element === null || element === void 0 ? void 0 : element.id_senasa) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === queryValue ||
                ((_b = element === null || element === void 0 ? void 0 : element.name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === queryValue ||
                ((_c = element === null || element === void 0 ? void 0 : element.device_number) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === queryValue) {
                animalesMatched.push(element);
            }
        });
        return res.status(200).send(animalesMatched);
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
});
// GET PREGNANT ORDERED BY DELIVERY DATE :
router.get("/pregnant", async (req, res) => {
    try {
        const arrayOfPregnantOrderedByDeliveryDate = await (0, animal_r_auxiliary_1.getPregnantInDeliveryDateOrder)("google-oauth2|112862055400782384259");
        console.log(`Retornando arreglo....`);
        return res.status(200).send(arrayOfPregnantOrderedByDeliveryDate);
    }
    catch (error) {
        console.log(`Error en "/pregnant". ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
exports.default = router;
