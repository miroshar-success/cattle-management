import { checkAnimal } from "../../validators/animal-validators";
import jwtCheck from "../../config/jwtMiddleware";
import { Router } from "express";
import { IReqAuth } from "../../types/user-types";
import { getUserByIdOrThrowError } from "../user/user-r-auxiliary";
import {
  getPregnantInDeliveryDateOrder,
  typesOfAnimalsToArray,
} from "./animal-r-auxiliary";

// MDB:
import { Animal, User } from "../../mongoDB";
import { IAnimal } from "../../mongoDB/models/Animal";
import { getStatsObjEvo } from "./getStatsAuxFn";

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
    const user_id = reqAuth.sub;
    const userInDB = await getUserByIdOrThrowError(user_id);
    let animalsFromUser: IAnimal[] = userInDB.animals;
    return res.status(200).send(animalsFromUser);
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
    const userInDB = await getUserByIdOrThrowError(user_id);

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
    const user_id: string = reqAuth.sub;
    const id_senasaFromParams: string = req.params.id_senasa;

    if (!id_senasaFromParams) {
      throw new Error(`El id de SENASA es falso.`);
    }
    let userInDB = await getUserByIdOrThrowError(user_id);
    if (userInDB === null) {
      throw new Error(
        `Usuario con id '${user_id}'no encontrado en la base de datos.`
      );
    }

    await userInDB.animals.id(id_senasaFromParams)?.remove();
    await userInDB.save();

    return res
      .status(200)
      .send({ msg: "Animal eliminado exitosamente", status: true });
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
    const user_id = reqAuth.sub;
    const userInDB = await getUserByIdOrThrowError(user_id);
    let foundAnimal = userInDB.animals.id(id_senasa);

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
    let typesOfAnimalsArray = typesOfAnimalsToArray();
    return res.status(200).send(typesOfAnimalsArray);
  } catch (error: any) {
    console.log(`Error en GET 'animal/typesAllowed. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

// SEARCH BY QUERY :
router.get("/search", jwtCheck, async (req: any, res) => {
  try {
    let queryValue = req.query.value;
    const reqAuth: IReqAuth = req.auth;
    const user_id = reqAuth.sub;

    if (typeof queryValue === "string") {
      queryValue = queryValue.toLowerCase();
    }
    // buscar coincidencias adentro de User con forEach :
    const userInDB = await getUserByIdOrThrowError(user_id);
    if (userInDB === null) {
      throw new Error("Usuario no encontrado");
    }

    const userAnimals: IAnimal[] = userInDB.animals;
    let animalesMatched: IAnimal[] = [];
    userAnimals.forEach((element: IAnimal) => {
      if (
        element?.id_senasa?.toLowerCase() === queryValue ||
        element?.name?.toLowerCase() === queryValue ||
        element?.device_number?.toLowerCase() === queryValue
      ) {
        animalesMatched.push(element);
      }
    });

    return res.status(200).send(animalesMatched);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
});

// GET PREGNANT ORDERED BY DELIVERY DATE :
router.get("/pregnant", async (req, res) => {
  try {
    const arrayOfPregnantOrderedByDeliveryDate =
      await getPregnantInDeliveryDateOrder(
        "google-oauth2|112862055400782384259"
      );
    console.log(`Retornando arreglo....`);
    return res.status(200).send(arrayOfPregnantOrderedByDeliveryDate);
  } catch (error: any) {
    console.log(`Error en "/pregnant". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
});

export default router;
