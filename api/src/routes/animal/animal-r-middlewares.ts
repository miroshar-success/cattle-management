import { Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { checkAnimal } from "../../validators/animal-validators";
import { getUserByIdOrThrowError } from "../user/user-r-auxiliary";
import {
  getPregnantInDeliveryDateOrder,
  typesOfAnimalsToArray,
} from "./animal-r-auxiliary";
import { getStatsObjEvo } from "./getStatsAuxFn";
import { Animal } from "../../mongoDB";
import { IAnimal } from "../../mongoDB/models/Animal";

//* MIDDLEWARE FUNCTION FOR THE REQUESTS :

// GET STATS :
export async function handleGetStatsRequest(req: JWTRequest, res: Response) {
  try {
    const user_id = req.auth?.sub;
    if (!user_id) {
      throw new Error("User id no puede ser falso.");
    }
    const stats = await getStatsObjEvo(user_id);

    console.log(`Devolviendo objeto stats...`);
    return res.status(200).send(stats);
  } catch (error: any) {
    console.log(`Error en GET 'animal/stats'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// GET ALL ANIMALS FROM USER :
export async function handleGetAllAnimalsFromUserRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    const user_id = req.auth?.sub;
    if (!user_id) {
      throw new Error("User id no puede ser falso.");
    }
    const userInDB = await getUserByIdOrThrowError(user_id);
    let animalsFromUser = userInDB.animals;
    return res.status(200).send(animalsFromUser);
  } catch (error: any) {
    console.log(`Error en "/animal/". ${error.message}`);
    return res.send({ error: error.message });
  }
}

// POST NEW ANIMAL:
export async function handlePostNewAnimalRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    const user_id = req.auth?.sub;
    if (!user_id) {
      throw new Error("User id no puede ser falso.");
    }
    const userInDB = await getUserByIdOrThrowError(user_id);

    console.log(`REQ.BODY = `);
    console.log(req.body);
    const validatedNewAnimal = checkAnimal(req.body, user_id);
    const newAnimalCreated = await Animal.create(validatedNewAnimal);
    userInDB.animals.push(newAnimalCreated);
    // userInDB.animalsPop.push(newAnimalCreated._id);
    await userInDB.save();
    console.log(`nuevo animal creado y pusheado al usuario con id ${user_id}`);
    return res.status(200).send({
      msg: "Animal creado correctamente.",
      animal: newAnimalCreated,
    });
  } catch (error: any) {
    console.log(`Error en POST 'user/'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// DELETE ANIMAL :
export async function handleDeleteAnimalById(req: JWTRequest, res: Response) {
  let response = {
    userAnimal: 0,
    animalCollection: 0,
  };
  try {
    const user_id = req.auth?.sub;
    const id_senasaFromParams: string = req.params.id_senasa;

    if (!id_senasaFromParams) {
      throw new Error(`El id de SENASA es falso.`);
    }
    if (!user_id) {
      throw new Error("El user id es falso.");
    }

    let userInDB = await getUserByIdOrThrowError(user_id);
    if (userInDB === null) {
      throw new Error(
        `Usuario con id '${user_id}'no encontrado en la base de datos.`
      );
    }
    const userAnimal = userInDB.animals.id(id_senasaFromParams);
    const animalFromCollection = await Animal.findOneAndDelete({
      _id: id_senasaFromParams,
      UserId: user_id,
    }).exec();

    if (animalFromCollection !== null) {
      response.animalCollection++;
    }
    if (userAnimal !== null) {
      userAnimal.remove();
      await userInDB.save();
      response.userAnimal++;
    }

    return res.status(200).send(response);
  } catch (error: any) {
    console.log(`Error en DELETE por id. ${error.message}`);
    return res.status(400).send({ error: error.message, response: response });
  }
}

// GET BY ID_SENASA :
export async function handleGetAnimalByIdRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    const { id_senasa } = req.params;

    const user_id = req.auth?.sub;
    if (!user_id) {
      throw new Error("El user id es falso.");
    }
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
}

// UPDATE ANIMAL :
export async function handleUpdateAnimalRequest(
  req: JWTRequest,
  res: Response
) {
  let response = {
    userAnimals: 0,
    animalCollection: 0,
  };
  try {
    console.log(`REQ.BODY = `);
    console.log(req.body);

    const userId = req.auth?.sub;
    if (!userId) {
      throw new Error("El user id es falso");
    }

    const userInDB = await getUserByIdOrThrowError(userId);
    const validatedAnimal: IAnimal = checkAnimal(req.body, userId);

    let foundAnimal = userInDB.animals.id(validatedAnimal._id);
    if (foundAnimal !== null) {
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
      response.userAnimals++;
    }
    const animalInCollection = await Animal.findById(validatedAnimal._id);
    if (animalInCollection !== null) {
      animalInCollection.type_of_animal = validatedAnimal.type_of_animal;
      animalInCollection.breed_name = validatedAnimal.breed_name;
      animalInCollection.location = validatedAnimal.location;
      animalInCollection.weight_kg = validatedAnimal.weight_kg;
      animalInCollection.name = validatedAnimal.name;
      animalInCollection.device_type = validatedAnimal.device_type;
      animalInCollection.device_number = validatedAnimal.device_number;
      animalInCollection.images = validatedAnimal.images;
      animalInCollection.comments = validatedAnimal.comments;
      animalInCollection.birthday = validatedAnimal.birthday;
      animalInCollection.is_pregnant = validatedAnimal.is_pregnant;
      animalInCollection.delivery_date = validatedAnimal.delivery_date;
      animalInCollection.sex = validatedAnimal.sex;
      await animalInCollection.save();
      response.animalCollection++;
    }
    return res.status(200).send(response);
  } catch (error: any) {
    console.log(`Error en PUT "/animal". ${error.message}`);
    return res.status(400).send({ error: error.message, updated: response });
  }
}

// GET TYPES OF ANIMAL ACCEPTED :
export async function handleGetTypesAllowedRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    let typesOfAnimalsArray = typesOfAnimalsToArray();
    return res.status(200).send(typesOfAnimalsArray);
  } catch (error: any) {
    console.log(`Error en GET 'animal/typesAllowed. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// SEARCH BY QUERY :
export async function handleSearchByQueryRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    let queryValue = req.query.value;

    const user_id = req.auth?.sub;
    if (!user_id) {
      throw new Error("El user id es falso.");
    }
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
}

// GET PREGNANT ORDERED BY DELIVERY DATE :
export async function handleGetPregnantSortedRequest(
  req: JWTRequest,
  res: Response
) {
  try {
    const user_id = req.auth?.sub;
    if (!user_id) {
      throw new Error("User id falso");
    }
    const arrayOfPregnantOrderedByDeliveryDate =
      await getPregnantInDeliveryDateOrder(user_id);
    console.log(`Retornando arreglo....`);
    return res.status(200).send(arrayOfPregnantOrderedByDeliveryDate);
  } catch (error: any) {
    console.log(`Error en "/pregnant". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}
