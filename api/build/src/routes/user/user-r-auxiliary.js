"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExistsInDataBase = exports.throwErrorIfUserIsNotRegisteredInDB = exports.userIsRegisteredInDB = exports.emailExistsInDataBase = void 0;
const generic_validators_1 = require("../../validators/generic-validators");
const mongoDB_1 = require("../../mongoDB/");
async function emailExistsInDataBase(emailFromReq) {
    if (!(0, generic_validators_1.isEmail)(emailFromReq)) {
        throw new Error(`Error al chequear si el email existe en la DataBase: el email '${emailFromReq}' no tiene un formato de email válido.`);
    }
    let emailRegisteredAlready = await mongoDB_1.User.findOne({
        email: emailFromReq,
    });
    if (emailRegisteredAlready) {
        throw new Error(`El email '${emailFromReq}' ya se encuentra registrado en la Data Base. Nombre del usuario al que le pertenece ese email: '${emailRegisteredAlready.name}'`);
    }
}
exports.emailExistsInDataBase = emailExistsInDataBase;
async function userIsRegisteredInDB(reqAuthSub) {
    if (!reqAuthSub) {
        throw new Error(`El req.auth.sub no puede ser falso.`);
    }
    if (typeof reqAuthSub !== "string") {
        throw new Error(`El req.auth.sub debe ser un string`);
    }
    const foundUserInDB = await mongoDB_1.User.findById(reqAuthSub);
    if (foundUserInDB) {
        return true;
    }
    else {
        return false;
    }
}
exports.userIsRegisteredInDB = userIsRegisteredInDB;
async function throwErrorIfUserIsNotRegisteredInDB(reqAuthSub) {
    if (!reqAuthSub) {
        throw new Error(`El req.auth.sub no puede ser falso.`);
    }
    if (typeof reqAuthSub !== "string") {
        throw new Error(`El req.auth.sub debe ser un string`);
    }
    const foundUserInDB = await mongoDB_1.User.findById(reqAuthSub);
    if (foundUserInDB) {
        return;
    }
    else {
        console.log(`Error! Usuario no encontrado en la DB en fn aux throwErrorIfUserIsNotRegisteredInDB`);
        throw new Error(`El usuario con id '${reqAuthSub}' no existe en la database.`);
    }
}
exports.throwErrorIfUserIsNotRegisteredInDB = throwErrorIfUserIsNotRegisteredInDB;
async function userExistsInDataBase(reqAuthSub) {
    try {
        if (!reqAuthSub) {
            throw new Error("No se ingresó un argumento en aux fn userExistsInDataBase");
        }
        const userExists = await mongoDB_1.User.exists({ _id: reqAuthSub });
        if (userExists)
            return true;
        return false;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
exports.userExistsInDataBase = userExistsInDataBase;
