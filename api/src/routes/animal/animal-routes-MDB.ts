import { checkAnimal } from "../../validators/animal-validators";
import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";
import { IReqAuth } from "../../types/user-types";
import {
  getUserByIdOrThrowError,
  throwErrorIfUserIsNotRegisteredInDB,
} from "../user/user-r-auxiliary";
import {
  getAndParseIsPregnantQuery,
  typesOfAnimalsToArray,
} from "./animal-r-auxiliary";
import { stringToBoolean } from "../../validators/generic-validators";

// MDB:
import { Animal, User } from "../../mongoDB";
import { IAnimal, ETypeOfAnimal } from "../../mongoDB/models/Animal";
import { IUser } from "../../mongoDB/models/User";
import { getStatsObjEvo } from "./getStatsAuxFn";
require("dotenv").config();
const USER_ID_FER_AZU = process.env.USER_ID_FER_AZU;
const USER_ID_ROB_AUG = "google-oauth2|112862055400782384259";
const router = Router();

// ------- RUTAS MONGO MONGOOSE : ---------

// GET STATS EVO DEFINITIVE :
router.get("/stats", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const user_id = reqAuth.sub;
    const stats = await getStatsObjEvo(user_id);

    console.log(`Devolviendo objeto stats...`);
    return res.status(200).send(stats);
  } catch (error: any) {
    console.log(`Error en GET 'animal/stats'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// GET ALL ANIMALS FROM USER :
router.get("/", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;

    const userInDB: IUser | null = await User.findById(userId);
    if (userInDB !== null) {
      let animalsFromUser: IAnimal[] = userInDB.animals;
      console.log("animalsFromUser.length = ", animalsFromUser.length);
      return res.status(200).send(animalsFromUser);
    } else {
      throw new Error("Usuario no encontrado en la base de datos.");
    }
  } catch (error: any) {
    console.log(`Error en "/animal/". ${error.message}`);
    return res.send({ error: error.message });
  }
});

// POST NEW ANIMAL:
router.post("/", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const user_id = reqAuth.sub;
    await throwErrorIfUserIsNotRegisteredInDB(user_id);
    const userInDB = await getUserByIdOrThrowError(user_id);
    // const userInDB = await User.findById(userId)
    console.log(`REQ.BODY = `);
    console.log(req.body);
    const validatedNewAnimal = checkAnimal({ ...req.body, user_id });
    const newAnimalCreated = await Animal.create(validatedNewAnimal);
    userInDB?.animals.push(newAnimalCreated);
    userInDB.animalsPop.push(newAnimalCreated._id);
    await userInDB.save();
    console.log(`nuevo animal creado y pusheado al usuario con id ${user_id}`);
    return res
      .status(200)
      .send({ msg: "Animal creado correctamente.", animal: newAnimalCreated });
  } catch (error: any) {
    console.log(`Error en POST 'user/'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// DELETE ANIMAL :
router.delete("/delete/:id_senasa", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const userId: string = reqAuth.sub;
    const id_senasaFromParams: string = req.params.id_senasa;
    console.log(`En delete por id...: `, id_senasaFromParams);

    if (!id_senasaFromParams) {
      throw new Error(`El id de senasa es falso.`);
    }
    await throwErrorIfUserIsNotRegisteredInDB(userId);
    let userInDB = await User.findById(userId);
    if (userInDB) {
      let animalFound = userInDB.notes.id(id_senasaFromParams);
      console.log("Animal FOUND = ", animalFound);
      let removed = await userInDB.animals.id(id_senasaFromParams)?.remove();
      console.log("REMOVED = ", removed);

      await userInDB.save();
      console.log("Documento borrado.");
      // console.log(userInDB);
      return res
        .status(200)
        .send({ msg: "Animal eliminado exitosamente", status: true });
    } else {
      throw new Error("Usuario no encontrado en la base de datos.");
    }
  } catch (error: any) {
    console.log(`Error en DELETE por id. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// GET BY ID_SENASA :
router.get("/id/:id_senasa", jwtCheck, async (req: any, res) => {
  try {
    const { id_senasa } = req.params;
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    const userInDB = await getUserByIdOrThrowError(userId);

    let foundAnimal = userInDB.animals.id(id_senasa);
    if (foundAnimal) {
      console.log("FOUND ANIMAL ENCONTRADO! = ", foundAnimal);
      return res.status(200).send(foundAnimal);
    } else {
      return res.status(404).send({
        error: `No se encontró ningún registro con el id '${id_senasa}'.`,
      });
    }
  } catch (error: any) {
    console.log(`Error en GET "/:id_senasa". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// UPDATE ANIMAL :
router.put("/", jwtCheck, async (req: any, res) => {
  try {
    console.log(`REQ.BODY = `);
    console.log(req.body);
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;

    const userInDB = await getUserByIdOrThrowError(userId);
    const validatedAnimal: IAnimal = checkAnimal({ ...req.body, userId });
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
  } catch (error: any) {
    console.log(`Error en PUT "/animal". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// GET TYPES OF ANIMAL ACCEPTED :
router.get("/typesAllowed", async (req, res) => {
  try {
    console.log(`Types of animals allowed: `);
    let typesOfAnimalsArray = typesOfAnimalsToArray();
    console.log(typesOfAnimalsArray);
    return res.status(200).send(typesOfAnimalsArray);
  } catch (error: any) {
    console.log(`Error en GET 'animal/typesAllowed. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// SEARCH BY QUERY EN DESARROLLO EXPERIMENTAL:
router.get("/search", jwtCheck, async (req: any, res) => {
  try {
    console.log(`Buscando por query...`);
    console.log(req.query);
    let queryValue = req.query.value;
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    await throwErrorIfUserIsNotRegisteredInDB(userId);

    if (typeof queryValue === "string") {
      queryValue.toLowerCase();
    }

    // buscar adentro de User con forEach :
    const userInDB = await User.findById(userId);
    if (userInDB === null) {
      throw new Error("Usuario no encontrado");
    }
    console.log("usuario encontrado");

    const userAnimals = userInDB.animals;
    let animalesMatched: IAnimal[] = [];
    userAnimals.forEach((element: IAnimal) => {
      if (
        element.id_senasa === queryValue ||
        element.name === queryValue ||
        element.device_number === queryValue
      ) {
        animalesMatched.push(element);
      }
    });

    console.log("ANIMALS FOUND = ", animalesMatched);
    console.log("animalesMatched.length =", animalesMatched.length);

    // buscar en collection Animal :
    const multiQuery = await Animal.find({
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

    const multiQuery2 = await Animal.where({ UserId: userId }).where({
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
  } catch (error: any) {
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
router.get("/isPregnant", jwtCheck, async (req: any, res) => {
  try {
    // espero req.query.status = true || false
    //URL Ej:  /animal/isPregnant?status=true || false
    console.log(req.query);
    console.log("req.query.status = ", req.query.status);
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    let status = req.query.status;
    let statusParsed: boolean = stringToBoolean(status);
    let order = req.query.order; // ASC || DESC || NULLS FIRST

    const querySearchResult = await getAndParseIsPregnantQuery(
      userId,
      statusParsed,
      order
    );
    return res.status(200).send(querySearchResult);
  } catch (error: any) {
    console.log(`Error en '/animal/isPregnant. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// router.get("/stats", jwtCheck, async (req: any, res) => {
//   try {
//     const reqAuth: IReqAuth = req.auth;
//     const userId = reqAuth.sub;
//     let stats = {
//       allFoundAndCount: await getObjOfAllAnimalsAndCount(userId),
//       deviceType: await getObjOfAnimalsByDeviceType(userId),
//       location: await getObjOfAnimalsByLocation(userId),
//       races: await getObjOfAnimalsByRace(userId),
//       pregnant: await getObjOfAnimalsPregnant(userId),
//       notPregnant: await getObjOfAnimalsNotPregnant(userId),
//       types: await getObjOfAnimalsByTypeOfAnimal(userId),
//       sex: await getObjOfAnimalsBySex(userId),
//       fetched: true,
//     };
//     console.log(`Devolviendo objeto stats...`);
//     return res.status(200).send(stats);
//   } catch (error: any) {
//     console.log(`Error en GET 'animal/stats'. ${error.message}`);
//     return res.status(400).send({ error: error.message });
//   }
// });

// router.get("/stats", jwtCheck, async (req: any, res) => {
//   try {
//     const reqAuth: IReqAuth = req.auth;
//     const user_id = reqAuth.sub;
//     const stats = await getStatsObjEvo(user_id);

//     console.log(`Devolviendo objeto stats...`);
//     return res.status(200).send(stats);
//   } catch (error: any) {
//     console.log(`Error en GET 'animal/stats'. ${error.message}`);
//     return res.status(400).send({ error: error.message });
//   }
// });

//! RUTA DE TESTEO DE VELOCIDAD ENTRE PROMISE.ALL y AWAITS.
// PARECE SER QUE AWAIT ES MÁS RÁPIDO.... inesperadamente! Y más prolijo también.
// router.get("/stats2", async (req: any, res) => {
//   // jwtCheck,
//   try {
//     const reqAuth: IReqAuth = req.auth;
//     // const userId = reqAuth.sub;
//     const userId: any = USER_ID_FER_AZU;

//     let initialTime = new Date().getTime();

//     const [
//       allFoundAndCount,
//       deviceType,
//       location,
//       races,
//       pregnant,
//       notPregnant,
//       types,
//       sex,
//     ] = await Promise.all([
//       getObjOfAllAnimalsAndCount(userId),
//       getObjOfAnimalsByDeviceType(userId),
//       getObjOfAnimalsByLocation(userId),
//       getObjOfAnimalsByRace(userId),
//       getObjOfAnimalsPregnant(userId),
//       getObjOfAnimalsNotPregnant(userId),
//       getObjOfAnimalsByTypeOfAnimal(userId),
//       getObjOfAnimalsBySex(userId),
//     ]);
//     let stats2 = {
//       allFoundAndCount,
//       deviceType,
//       location,
//       races,
//       pregnant,
//       notPregnant,
//       types,
//       sex,
//       fetched: true,
//     };

//     let finalTime = new Date().getTime();
//     let totalTime = finalTime - initialTime;
//     totalTime = totalTime * 1;
//     console.log("TotalTime con Promise.all() = ", totalTime);

//     // CON AWAITS (PARECE SER MÁS RÁPIDO QUE CON PROMISE.ALL!!!!)
//     let initialTimeAwaits = new Date().getTime();
//     let stats = {
//       allFoundAndCount: await getObjOfAllAnimalsAndCount(userId),
//       deviceType: await getObjOfAnimalsByDeviceType(userId),
//       location: await getObjOfAnimalsByLocation(userId),
//       races: await getObjOfAnimalsByRace(userId),
//       pregnant: await getObjOfAnimalsPregnant(userId),
//       notPregnant: await getObjOfAnimalsNotPregnant(userId),
//       types: await getObjOfAnimalsByTypeOfAnimal(userId),
//       sex: await getObjOfAnimalsBySex(userId),
//       fetched: true,
//     };

//     let finalTimeAwaits = new Date().getTime();

//     let totalTimeAwaits = finalTimeAwaits - initialTimeAwaits;
//     totalTimeAwaits = totalTimeAwaits * 1;
//     console.log("Total time Awaits = ", totalTimeAwaits);

//     return res.status(200).send({
//       statsPAll: stats2,
//       statsAwait: stats,
//       tPA: totalTime,
//       tAwaits: totalTimeAwaits,
//     });
//   } catch (error: any) {
//     console.log(`Error en GET 'animal/stats'. ${error.message}`);
//     return res.status(400).send({ error: error.message });
//   }
// });

//! A G G R E G A T I O N S   TESTING! : - - - - - - - - - -

// let aggregateMJS = [
//   {
//     $match: {
//       _id: {
//         $in: ["google-oauth2|112862055400782384259"],
//       },
//     },
//   },
//   {
//     $unwind: "$animals",
//   },
//   {
//     $group: {
//       _id: "$animals.breed_name",
//       count: { $sum: 1 },
//     },
//   },
// ];
// Este aggregate devuelve este arreglo:
// [
//   {
//     _id: "mangostaaa",
//     count: 1,
//   },
//   {
//     _id: "mangostita",
//     count: 1,
//   },
//   {
//     _id: "angus",
//     count: 2,
//   },
//   {
//     _id: "holstein",
//     count: 2,
//   },
// ];

//!----- TESTING AGGREGATIONS : ------------

// router.get("/statsMDB", async (req, res) => {
//   try {
//     const stats = await getStatsObj("google-oauth2|112862055400782384259");
//     return res.status(200).send(stats);
//   } catch (error: any) {
//     return res.status(400).send({ error: error.message });
//   }
// });

// router.get("/statsMDBevo", async (req, res) => {
//   try {
//     const stats = await getStatsObjEvo("google-oauth2|112862055400782384259");
//     return res.status(200).send(stats);
//   } catch (error: any) {
//     return res.status(400).send({ error: error.message });
//   }
// });

// router.get("/TstatsSQLZ", async (req: any, res) => {
//   try {
//     const userId = USER_ID_ROB_AUG;
//     let stats = {
//       allFoundAndCount: await getObjOfAllAnimalsAndCount(userId),
//       deviceType: await getObjOfAnimalsByDeviceType(userId),
//       location: await getObjOfAnimalsByLocation(userId),
//       races: await getObjOfAnimalsByRace(userId),
//       pregnant: await getObjOfAnimalsPregnant(userId),
//       notPregnant: await getObjOfAnimalsNotPregnant(userId),
//       types: await getObjOfAnimalsByTypeOfAnimal(userId),
//       sex: await getObjOfAnimalsBySex(userId),
//       fetched: true,
//     };
//     console.log(`Devolviendo objeto stats...`);
//     return res.status(200).send(stats);
//   } catch (error: any) {
//     console.log(`Error en GET 'animal/stats'. ${error.message}`);
//     return res.status(400).send({ error: error.message });
//   }
// });

// GET STATS EVO DEFINITIVE :
// router.get("/TstatsDefEvo", async (req: any, res) => {
//   try {
//     const user_id: string = USER_ID_ROB_AUG;
//     const stats = await getStatsObjEvo(user_id);

//     console.log(`Devolviendo objeto stats...`);
//     return res.status(200).send(stats);
//   } catch (error: any) {
//     console.log(`Error en GET 'animal/stats'. ${error.message}`);
//     return res.status(400).send({ error: error.message });
//   }
// });

//! ---- TESTING SEQUELIZE RESULTS: ----------------

// router.get("/ts1", async (req, res) => {
//   try {
//     let initialTime = new Date().getTime();
//     console.log(initialTime);
//     console.log(new Date().getTime());

//     let finalTime = new Date().getTime();
//     console.log(finalTime);
//     console.log(new Date().getTime());

//     let totalTime = finalTime - initialTime;
//     totalTime = totalTime * 1000;
//     return res.status(200).send({ msg: totalTime });
//   } catch (error: any) {
//     return res.status(400).send({ error: error.message });
//   }
// });

//! ------------

export default router;
