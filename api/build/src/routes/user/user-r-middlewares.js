"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetUserInfo = exports.handleDoesUserExistInDB = exports.handleRegisterNewUser = void 0;
const user_r_auxiliary_1 = require("./user-r-auxiliary");
const user_validators_1 = require("../../validators/user-validators");
// -------- MONGO / MONGOOSE : ------------
const mongoDB_1 = require("../../mongoDB/");
// POST NEW USER
async function handleRegisterNewUser(req, res) {
    var _a;
    try {
        console.log(`REQ.BODY =`);
        console.log(req.body);
        const _id = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
        const { name, email, profile_img } = req.body;
        await (0, user_r_auxiliary_1.emailExistsInDataBase)(email);
        const validatedUser = (0, user_validators_1.validateNewUser)(_id, name, email, profile_img);
        const newUser = await mongoDB_1.User.create(validatedUser);
        console.log(newUser);
        return res.status(201).send(newUser);
    }
    catch (error) {
        console.log(`Error en ruta POST "user/". ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}
exports.handleRegisterNewUser = handleRegisterNewUser;
// USER EXISTS IN THE DATA BASE
async function handleDoesUserExistInDB(req, res) {
    var _a;
    try {
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
        // const isUserRegisteredinDB = await userIsRegisteredInDB(userId);
        const isUserRegisteredinDB = await mongoDB_1.User.findById(userId).lean();
        if (isUserRegisteredinDB) {
            return res.status(200).send({ msg: true });
        }
        if (!isUserRegisteredinDB) {
            console.log(`Usuario no encontrado en la DB.`);
            return res.status(200).send({ msg: false });
        }
    }
    catch (error) {
        console.log(`Error en GET "/user/existsInDB. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}
exports.handleDoesUserExistInDB = handleDoesUserExistInDB;
// USER INFO :
async function handleGetUserInfo(req, res) {
    var _a;
    try {
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub;
        // await throwErrorIfUserIsNotRegisteredInDB(userId);
        const userInfo = await mongoDB_1.User.findById(userId).populate("animalsPop");
        if (!userInfo) {
            throw new Error(`El usuario con id '${userId}'no fue encontrado en la Data Base`);
        }
        return res.status(200).send(userInfo);
    }
    catch (error) {
        console.log(`Error en 'user/userInfo'. ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
}
exports.handleGetUserInfo = handleGetUserInfo;
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
