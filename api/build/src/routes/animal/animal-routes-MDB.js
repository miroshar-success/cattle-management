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
const generic_validators_1 = require("../../validators/generic-validators");
// MDB:
const mongoDB_1 = require("../../mongoDB");
require("dotenv").config();
const USER_ID_FER_AZU = process.env.USER_ID_FER_AZU;
const router = (0, express_1.Router)();
// ------- RUTAS MONGO MONGOOSE : ---------
// GET ALL ANIMALS FROM USER :
router.get("/", jwtMiddleware_1.default, async (req, res) => {
    try {
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        const userInDB = await mongoDB_1.User.findById(userId);
        if (userInDB !== null) {
            let animalsFromUser = userInDB.animals;
            console.log("animalsFromUser.length = ", animalsFromUser.length);
            return res.status(200).send(animalsFromUser);
        }
        else {
            throw new Error("Usuario no encontrado en la base de datos.");
        }
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
        await (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(user_id);
        const userInDB = await (0, user_r_auxiliary_1.getUserByIdOrThrowError)(user_id);
        // const userInDB = await User.findById(userId)
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
        const userId = reqAuth.sub;
        const id_senasaFromParams = req.params.id_senasa;
        console.log(`En delete por id...: `, id_senasaFromParams);
        if (!id_senasaFromParams) {
            throw new Error(`El id de senasa es falso.`);
        }
        await (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        let userInDB = await mongoDB_1.User.findById(userId);
        if (userInDB) {
            let animalFound = userInDB.notes.id(id_senasaFromParams);
            console.log("Animal FOUND = ", animalFound);
            let removed = await ((_a = userInDB.animals.id(id_senasaFromParams)) === null || _a === void 0 ? void 0 : _a.remove());
            console.log("REMOVED = ", removed);
            await userInDB.save();
            console.log("Documento borrado.");
            // console.log(userInDB);
            return res
                .status(200)
                .send({ msg: "Animal eliminado exitosamente", status: true });
        }
        else {
            throw new Error("Usuario no encontrado en la base de datos.");
        }
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
        const userId = reqAuth.sub;
        const userInDB = await (0, user_r_auxiliary_1.getUserByIdOrThrowError)(userId);
        let foundAnimal = userInDB.animals.id(id_senasa);
        if (foundAnimal) {
            console.log("FOUND ANIMAL ENCONTRADO! = ", foundAnimal);
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
        console.log(`Types of animals allowed: `);
        let typesOfAnimalsArray = (0, animal_r_auxiliary_1.typesOfAnimalsToArray)();
        console.log(typesOfAnimalsArray);
        return res.status(200).send(typesOfAnimalsArray);
    }
    catch (error) {
        console.log(`Error en GET 'animal/typesAllowed. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
// SEARCH BY QUERY EN DESARROLLO EXPERIMENTAL:
router.get("/search", jwtMiddleware_1.default, async (req, res) => {
    try {
        console.log(`Buscando por query...`);
        console.log(req.query);
        let queryValue = req.query.value;
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        await (0, user_r_auxiliary_1.throwErrorIfUserIsNotRegisteredInDB)(userId);
        if (typeof queryValue === "string") {
            queryValue.toLowerCase();
        }
        // buscar adentro de User con forEach :
        const userInDB = await mongoDB_1.User.findById(userId);
        if (userInDB === null) {
            throw new Error("Usuario no encontrado");
        }
        console.log("usuario encontrado");
        const userAnimals = userInDB.animals;
        let animalesMatched = [];
        userAnimals.forEach((element) => {
            if (element.id_senasa === queryValue ||
                element.name === queryValue ||
                element.device_number === queryValue) {
                animalesMatched.push(element);
            }
        });
        console.log("ANIMALS FOUND = ", animalesMatched);
        console.log("animalesMatched.length =", animalesMatched.length);
        // buscar en collection Animal :
        const multiQuery = await mongoDB_1.Animal.find({
            $and: [
                { UserId: userId },
                {
                    $or: [
                        { id_senasa: queryValue },
                        { name: queryValue },
                        { device_number: queryValue },
                    ],
                },
            ],
        });
        const multiQuery2 = await mongoDB_1.Animal.where({ UserId: userId }).where({
            $or: [
                { id_senasa: queryValue },
                { name: queryValue },
                { device_number: queryValue },
            ],
        });
        // const fetchedAnimals = await Animal.where("name").equals(queryValue);
        // console.log(fetchedAnimals);
        console.log("MQ = ", multiQuery.length);
        console.log("MQ2 = ", multiQuery2.length);
        return res.status(200).send(multiQuery);
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
});
//! ------- RUTAS SEQUELIZE : ---------
// SEARCH BY QUERY :
// router.get("/search", jwtCheck, async (req: any, res) => {
//   try {
//     console.log(`Buscando por query...`);
//     console.log(req.query);
//     let queryValue = req.query.value;
//     const reqAuth: IReqAuth = req.auth;
//     const userId = reqAuth.sub;
//     await throwErrorIfUserIsNotRegisteredInDB(userId);
//     if (typeof queryValue === "string") {
//       queryValue.toLowerCase();
//     }
//     const searchedResults: IAnimal[] = await db.Animal.findAll({
//       where: {
//         [Op.or]: [
//           { id_senasa: queryValue },
//           { name: queryValue },
//           { device_number: queryValue },
//         ],
//         UserId: userId,
//       },
//     });
//     console.log(`Largo de searchedResults = ${searchedResults?.length}`);
//     return res.status(200).send(searchedResults);
//   } catch (error: any) {
//     return res.status(400).send({ error: error.message });
//   }
// });
//! PARSED FOR STATS: ------------------
// GET ALL IS PREGNANT TRUE || FALSE & ORDERED BY DELIVERY DATE :
//Ruta de ejemplo:  localhost:3001/animal/isPregnant?status=true&order=ASC
router.get("/isPregnant", jwtMiddleware_1.default, async (req, res) => {
    try {
        // espero req.query.status = true || false
        //URL Ej:  /animal/isPregnant?status=true || false
        console.log(req.query);
        console.log("req.query.status = ", req.query.status);
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        let status = req.query.status;
        let statusParsed = (0, generic_validators_1.stringToBoolean)(status);
        let order = req.query.order; // ASC || DESC || NULLS FIRST
        const querySearchResult = await (0, animal_r_auxiliary_1.getAndParseIsPregnantQuery)(userId, statusParsed, order);
        return res.status(200).send(querySearchResult);
    }
    catch (error) {
        console.log(`Error en '/animal/isPregnant. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
router.get("/stats", jwtMiddleware_1.default, async (req, res) => {
    try {
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        let stats = {
            allFoundAndCount: await (0, animal_r_auxiliary_1.getObjOfAllAnimalsAndCount)(userId),
            deviceType: await (0, animal_r_auxiliary_1.getObjOfAnimalsByDeviceType)(userId),
            location: await (0, animal_r_auxiliary_1.getObjOfAnimalsByLocation)(userId),
            races: await (0, animal_r_auxiliary_1.getObjOfAnimalsByRace)(userId),
            pregnant: await (0, animal_r_auxiliary_1.getObjOfAnimalsPregnant)(userId),
            notPregnant: await (0, animal_r_auxiliary_1.getObjOfAnimalsNotPregnant)(userId),
            types: await (0, animal_r_auxiliary_1.getObjOfAnimalsByTypeOfAnimal)(userId),
            sex: await (0, animal_r_auxiliary_1.getObjOfAnimalsBySex)(userId),
            fetched: true,
        };
        console.log(`Devolviendo objeto stats...`);
        return res.status(200).send(stats);
    }
    catch (error) {
        console.log(`Error en GET 'animal/stats'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
//! RUTA DE TESTEO DE VELOCIDAD ENTRE PROMISE.ALL y AWAITS.
// PARECE SER QUE AWAIT ES MÁS RÁPIDO.... inesperadamente! Y más prolijo también.
router.get("/stats2", async (req, res) => {
    // jwtCheck,
    try {
        const reqAuth = req.auth;
        // const userId = reqAuth.sub;
        const userId = USER_ID_FER_AZU;
        let initialTime = new Date().getTime();
        const [allFoundAndCount, deviceType, location, races, pregnant, notPregnant, types, sex,] = await Promise.all([
            (0, animal_r_auxiliary_1.getObjOfAllAnimalsAndCount)(userId),
            (0, animal_r_auxiliary_1.getObjOfAnimalsByDeviceType)(userId),
            (0, animal_r_auxiliary_1.getObjOfAnimalsByLocation)(userId),
            (0, animal_r_auxiliary_1.getObjOfAnimalsByRace)(userId),
            (0, animal_r_auxiliary_1.getObjOfAnimalsPregnant)(userId),
            (0, animal_r_auxiliary_1.getObjOfAnimalsNotPregnant)(userId),
            (0, animal_r_auxiliary_1.getObjOfAnimalsByTypeOfAnimal)(userId),
            (0, animal_r_auxiliary_1.getObjOfAnimalsBySex)(userId),
        ]);
        let stats2 = {
            allFoundAndCount,
            deviceType,
            location,
            races,
            pregnant,
            notPregnant,
            types,
            sex,
            fetched: true,
        };
        let finalTime = new Date().getTime();
        let totalTime = finalTime - initialTime;
        totalTime = totalTime * 1;
        console.log("TotalTime con Promise.all() = ", totalTime);
        // CON AWAITS (PARECE SER MÁS RÁPIDO QUE CON PROMISE.ALL!!!!)
        let initialTimeAwaits = new Date().getTime();
        let stats = {
            allFoundAndCount: await (0, animal_r_auxiliary_1.getObjOfAllAnimalsAndCount)(userId),
            deviceType: await (0, animal_r_auxiliary_1.getObjOfAnimalsByDeviceType)(userId),
            location: await (0, animal_r_auxiliary_1.getObjOfAnimalsByLocation)(userId),
            races: await (0, animal_r_auxiliary_1.getObjOfAnimalsByRace)(userId),
            pregnant: await (0, animal_r_auxiliary_1.getObjOfAnimalsPregnant)(userId),
            notPregnant: await (0, animal_r_auxiliary_1.getObjOfAnimalsNotPregnant)(userId),
            types: await (0, animal_r_auxiliary_1.getObjOfAnimalsByTypeOfAnimal)(userId),
            sex: await (0, animal_r_auxiliary_1.getObjOfAnimalsBySex)(userId),
            fetched: true,
        };
        let finalTimeAwaits = new Date().getTime();
        let totalTimeAwaits = finalTimeAwaits - initialTimeAwaits;
        totalTimeAwaits = totalTimeAwaits * 1;
        console.log("Total time Awaits = ", totalTimeAwaits);
        return res.status(200).send({
            statsPAll: stats2,
            statsAwait: stats,
            tPA: totalTime,
            tAwaits: totalTimeAwaits,
        });
    }
    catch (error) {
        console.log(`Error en GET 'animal/stats'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
//! ---- TESTING SEQUELIZE RESULTS: ----------------
router.get("/ts1", async (req, res) => {
    try {
        let initialTime = new Date().getTime();
        console.log(initialTime);
        console.log(new Date().getTime());
        let finalTime = new Date().getTime();
        console.log(finalTime);
        console.log(new Date().getTime());
        let totalTime = finalTime - initialTime;
        totalTime = totalTime * 1000;
        return res.status(200).send({ msg: totalTime });
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
});
// router.get("/testing", async (req, res) => {
//   try {
//     const grouped = await db.Animal.findAll({
//       attributes: [
//         "breed_name",
//         [sequelize.fn("count", sequelize.col("breed_name")), "cnt"],
//       ],
//       group: ["breed_name"],
//       where: {
//         UserId: "google-oauth2|111388821393357414643",
//       },
//     });
//     return res.status(200).send(grouped);
//   } catch (error: any) {
//     return res.send({ error: error.message });
//   }
// });
// router.get("/testing2", async (req, res) => {
//   try {
//     const resultados = await db.Animal.findAndCountAll({
//       where: {
//         type_of_animal: "Novillo",
//       },
//     });
//     return res.status(200).send(resultados);
//   } catch (error: any) {
//     return res.send({ error: error.message });
//   }
// });
// router.get("/testing3", async (req, res) => {
//   try {
//     let booleano = true;
//     const resultados = await db.Animal.findAndCountAll({
//       where: {
//         is_pregnant: booleano,
//       },
//     });
//     return res.status(200).send(resultados);
//   } catch (error: any) {
//     return res.send({ error: error.message });
//   }
// });
// router.get("/testing4", async (req, res) => {
//   try {
//     let arrayDeTiposDeAnimales = Object.values(ITypeOfAnimal);
//     console.log(arrayDeTiposDeAnimales);
//     let booleano = true;
//     let objParsed: any = {};
//     let arrayDePromesas = arrayDeTiposDeAnimales.map(
//       async (tipo) =>
//         await db.Animal.findAndCountAll({
//           where: {
//             type_of_animal: tipo,
//           },
//         })
//     );
//     const arregloCumplido = await Promise.all(arrayDePromesas);
//     // const resultados = await db.Animal.findAndCountAll({
//     //   where: {
//     //     is_pregnant: booleano,
//     //   },
//     // });
//     return res.status(200).send(arregloCumplido);
//   } catch (error: any) {
//     return res.send({ error: error.message });
//   }
// });
//! ------------
exports.default = router;
