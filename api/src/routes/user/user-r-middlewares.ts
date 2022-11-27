import { Request as JWTRequest } from "express-jwt";
import { Request, Response } from "express";
import { emailExistsInDataBase } from "./user-r-auxiliary";
import { validateNewUser } from "../../validators/user-validators";
// -------- MONGO / MONGOOSE : ------------
import { User } from "../../mongoDB/";
import { INewUser, IUser } from "../../mongoDB/models/User";

// POST NEW USER
export async function handleRegisterNewUser(req: JWTRequest, res: Response) {
  try {
    console.log(`REQ.BODY =`);
    console.log(req.body);

    const _id = req.auth?.sub;
    const { name, email, profile_img } = req.body;
    await emailExistsInDataBase(email);
    const validatedUser: INewUser = validateNewUser(
      _id,
      name,
      email,
      profile_img
    );

    const newUser = await User.create(validatedUser);
    console.log(newUser);
    return res.status(201).send(newUser);
  } catch (error: any) {
    console.log(`Error en ruta POST "user/". ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// USER EXISTS IN THE DATA BASE
export async function handleDoesUserExistInDB(req: JWTRequest, res: Response) {
  try {
    const userId = req.auth?.sub;
    // const isUserRegisteredinDB = await userIsRegisteredInDB(userId);
    const isUserRegisteredinDB = await User.findById(userId).lean();
    if (isUserRegisteredinDB) {
      return res.status(200).send({ msg: true });
    }
    if (!isUserRegisteredinDB) {
      console.log(`Usuario no encontrado en la DB.`);
      return res.status(200).send({ msg: false });
    }
  } catch (error: any) {
    console.log(`Error en GET "/user/existsInDB. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// USER INFO :
export async function handleGetUserInfo(req: JWTRequest, res: Response) {
  try {
    const userId = req.auth?.sub;
    // await throwErrorIfUserIsNotRegisteredInDB(userId);
    const userInfo = await User.findById(userId).populate("animalsPop");
    if (!userInfo) {
      throw new Error(
        `El usuario con id '${userId}'no fue encontrado en la Data Base`
      );
    }
    return res.status(200).send(userInfo);
  } catch (error: any) {
    console.log(`Error en 'user/userInfo'. ${error.message}`);
    return res.status(400).send({ error: error.message });
  }
}

// GET ALL USERS FROM DB : //La dejo comentada ya que es sólo para testing.
// export async function getAllUsersInDB(req: Request, res: Response) {
//   try {
//     const users: IUser[] = await User.find().lean();
//     return res.status(200).send(users);
//   } catch (error: any) {
//     console.log(`Error en ruta GET "user/". ${error.message}`);
//     return res.status(400).send({ error: error.message });
//   }
// }
