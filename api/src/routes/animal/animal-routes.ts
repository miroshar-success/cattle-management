import db from "../../models";
import { checkAnimal } from "../../validators/animal-validators";
import { IAnimal, ETypeOfAnimal } from "../../mongoDB/models/Animal";
import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";
import { IReqAuth } from "../../types/user-types";
import { throwErrorIfUserIsNotRegisteredInDB } from "../user/user-r-auxiliary";
import { Op } from "sequelize";
import {
  getAndParseIsPregnantQuery,
  getObjOfAllAnimalsAndCount,
  getObjOfAnimalsByDeviceType,
  getObjOfAnimalsByLocation,
  getObjOfAnimalsByRace,
  getObjOfAnimalsBySex,
  getObjOfAnimalsByTypeOfAnimal,
  getObjOfAnimalsNotPregnant,
  getObjOfAnimalsPregnant,
  typesOfAnimalsToArray,
} from "./animal-r-auxiliary";
import { stringToBoolean } from "../../validators/generic-validators";
require("dotenv").config();
const USER_ID_FER_AZU = process.env.USER_ID_FER_AZU;
const router = Router();

// ------- RUTAS : ---------

// GET ALL FROM ANIMALS :
router.get("/", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;

    const allAnimalsFromDB = await db.Animal.findAll({
      where: {
        UserId: userId,
      },
    });
    return res.status(200).send(allAnimalsFromDB);
  } catch (error: any) {
    console.log(`Error en "/animal/". ${error.message}`);
    return res.send({ error: error.message });
  }
});

// SEARCH BY QUERY :
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
    const searchedResults: IAnimal[] = await db.Animal.findAll({
      where: {
        [Op.or]: [
          { id_senasa: queryValue },
          { name: queryValue },
          { device_number: queryValue },
        ],
        UserId: userId,
      },
    });
    console.log(`Largo de searchedResults = ${searchedResults?.length}`);

    return res.status(200).send(searchedResults);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
});

// GET BY ID_SENASA :
router.get("/id/:id_senasa", jwtCheck, async (req: any, res) => {
  try {
    const { id_senasa } = req.params;
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    //Chequear si este where está bien puesto:
    const foundAnimal: IAnimal = await db.Animal.findOne({
      where: {
        id_senasa: id_senasa,
        UserId: userId,
      },
    });
    if (foundAnimal) {
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

// POST NEW ANIMAL JWTCHECK:
router.post("/", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    await throwErrorIfUserIsNotRegisteredInDB(userId);
    // let userIsRegistered = await userIsRegisteredInDB(userId);
    // if (userIsRegistered !== true) {
    //   throw new Error(`No se encontró al usuario registrado en la DB`);
    // }

    console.log(`REQ.BODY = `);
    console.log(req.body);
    const validatedNewAnimal = checkAnimal(req.body);
    const newAnimalCreated = await db.Animal.create(validatedNewAnimal);
    await newAnimalCreated.setUser(userId);
    console.log(`nuevo animal creado y asociado al usuario con id ${userId}`);
    return res
      .status(200)
      .send({ msg: "Animal creado correctamente.", animal: newAnimalCreated });
  } catch (error: any) {
    console.log(`Error en POST 'user/'. ${error.message}`);
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

    // let userIsRegistered = await userIsRegisteredInDB(userId);
    // if (userIsRegistered !== true) {
    //   throw new Error(`No se encontró al usuario registrado en la DB`);
    // }
    await throwErrorIfUserIsNotRegisteredInDB(userId);

    const validatedAnimal: IAnimal = checkAnimal(req.body);
    const updatedAnimal = await db.Animal.update(
      { ...validatedAnimal },
      {
        where: {
          id_senasa: validatedAnimal.id_senasa,
          UserId: userId,
        },
      }
    );
    console.log(`Animal actualizado. Retornando respuesta...`);

    return res.send({
      updated: Number(updatedAnimal[0]),
      msg: `Cantidad de animales actualizados correctamente: ${updatedAnimal[0]}`,
    });
  } catch (error: any) {
    console.log(`Error en PUT "/animal". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// DELETE ANIMAL :
router.delete("/delete/:id_senasa", jwtCheck, async (req: any, res) => {
  try {
    console.log(`En delete por id...`);
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    const id_senasaFromParams = req.params.id_senasa;
    if (!id_senasaFromParams) {
      throw new Error(`El id de senasa no puede ser falso.`);
    }
    await throwErrorIfUserIsNotRegisteredInDB(userId);
    let deletedAnimal = await db.Animal.destroy({
      where: {
        id_senasa: id_senasaFromParams,
        UserId: userId,
      },
    });
    console.log(deletedAnimal);
    return res.status(200).send({
      msg: `${deletedAnimal} Animal destruido suavemente`,
      deletedAnimal: deletedAnimal,
    });
  } catch (error: any) {
    console.log(`Error en DELETE por id. ${error.message}`);
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

router.get("/stats", jwtCheck, async (req: any, res) => {
  try {
    const reqAuth: IReqAuth = req.auth;
    const userId = reqAuth.sub;
    let stats = {
      allFoundAndCount: await getObjOfAllAnimalsAndCount(userId),
      deviceType: await getObjOfAnimalsByDeviceType(userId),
      location: await getObjOfAnimalsByLocation(userId),
      races: await getObjOfAnimalsByRace(userId),
      pregnant: await getObjOfAnimalsPregnant(userId),
      notPregnant: await getObjOfAnimalsNotPregnant(userId),
      types: await getObjOfAnimalsByTypeOfAnimal(userId),
      sex: await getObjOfAnimalsBySex(userId),
      fetched: true,
    };
    console.log(`Devolviendo objeto stats...`);
    return res.status(200).send(stats);
  } catch (error: any) {
    console.log(`Error en GET 'animal/stats'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

//! RUTA DE TESTEO DE VELOCIDAD ENTRE PROMISE.ALL y AWAITS.
// PARECE SER QUE AWAIT ES MÁS RÁPIDO.... inesperadamente! Y más prolijo también.
router.get("/stats2", async (req: any, res) => {
  // jwtCheck,
  try {
    const reqAuth: IReqAuth = req.auth;
    // const userId = reqAuth.sub;
    const userId: any = USER_ID_FER_AZU;

    let initialTime = new Date().getTime();

    const [
      allFoundAndCount,
      deviceType,
      location,
      races,
      pregnant,
      notPregnant,
      types,
      sex,
    ] = await Promise.all([
      getObjOfAllAnimalsAndCount(userId),
      getObjOfAnimalsByDeviceType(userId),
      getObjOfAnimalsByLocation(userId),
      getObjOfAnimalsByRace(userId),
      getObjOfAnimalsPregnant(userId),
      getObjOfAnimalsNotPregnant(userId),
      getObjOfAnimalsByTypeOfAnimal(userId),
      getObjOfAnimalsBySex(userId),
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
      allFoundAndCount: await getObjOfAllAnimalsAndCount(userId),
      deviceType: await getObjOfAnimalsByDeviceType(userId),
      location: await getObjOfAnimalsByLocation(userId),
      races: await getObjOfAnimalsByRace(userId),
      pregnant: await getObjOfAnimalsPregnant(userId),
      notPregnant: await getObjOfAnimalsNotPregnant(userId),
      types: await getObjOfAnimalsByTypeOfAnimal(userId),
      sex: await getObjOfAnimalsBySex(userId),
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
  } catch (error: any) {
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
  } catch (error: any) {
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
//     let arrayDeTiposDeAnimales = Object.values(ETypeOfAnimal);
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

export default router;
