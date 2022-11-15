"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_validators_1 = require("../../validators/user-validators");
const jwtMiddleware_1 = __importDefault(require("../../config/jwtMiddleware"));
const express_1 = require("express");
const user_r_auxiliary_1 = require("./user-r-auxiliary");
const router = (0, express_1.Router)();
// -------- MONGO / MONGOOSE : ------------
const mongoDB_1 = require("../../mongoDB/");
// GET ALL USERS :
router.get("/", async (req, res) => {
    try {
        const users = await mongoDB_1.User.find();
        return res.status(200).send(users);
    }
    catch (error) {
        console.log(`Error en ruta GET "user/". ${error.message}`);
        return res.status(400).send({ error: error.message });
    }
});
// POST NEW USER
router.post("/register", jwtMiddleware_1.default, async (req, res) => {
    try {
        console.log(`REQ.BODY =`);
        console.log(req.body);
        const reqAuth = req.auth;
        const _id = reqAuth.sub;
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
});
// USER EXISTS IN THE DATA BASE
router.get("/existsInDB", jwtMiddleware_1.default, async (req, res) => {
    try {
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
        // const isUserRegisteredinDB = await userIsRegisteredInDB(userId);
        const isUserRegisteredinDB = await mongoDB_1.User.findById(userId);
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
});
// USER INFO :
router.get("/userInfo", jwtMiddleware_1.default, async (req, res) => {
    try {
        const reqAuth = req.auth;
        const userId = reqAuth.sub;
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
});
exports.default = router;
