"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwErrorIfUserIsNotRegisteredInDB = exports.userIsRegisteredInDB = exports.emailExistsInDataBase = void 0;
const models_1 = __importDefault(require("../../models"));
const generic_validators_1 = require("../../validators/generic-validators");
function emailExistsInDataBase(emailFromReq) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, generic_validators_1.isEmail)(emailFromReq)) {
            throw new Error(`Error al chequear si el email existe en la DataBase: el email '${emailFromReq}' no tiene un formato de email válido.`);
        }
        let emailRegisteredAlready = yield models_1.default.User.findOne({
            where: {
                email: emailFromReq,
            },
        });
        if (emailRegisteredAlready) {
            throw new Error(`El email '${emailFromReq}' ya se encuentra registrado en la Data Base. Nombre del usuario al que le pertenece ese email: '${emailRegisteredAlready.name}'`);
        }
    });
}
exports.emailExistsInDataBase = emailExistsInDataBase;
function userIsRegisteredInDB(reqAuthSub) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!reqAuthSub) {
            throw new Error(`El req.auth.sub no puede ser falso.`);
        }
        if (typeof reqAuthSub !== "string") {
            throw new Error(`El req.auth.sub debe ser un string`);
        }
        const foundUserInDB = yield models_1.default.User.findByPk(reqAuthSub);
        if (foundUserInDB) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.userIsRegisteredInDB = userIsRegisteredInDB;
function throwErrorIfUserIsNotRegisteredInDB(reqAuthSub) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!reqAuthSub) {
            throw new Error(`El req.auth.sub no puede ser falso.`);
        }
        if (typeof reqAuthSub !== "string") {
            throw new Error(`El req.auth.sub debe ser un string`);
        }
        const foundUserInDB = yield models_1.default.User.findByPk(reqAuthSub);
        if (foundUserInDB) {
            return;
        }
        else {
            console.log(`Error! Usuario no encontrado en la DB en fn aux throwErrorIfUserIsNotRegisteredInDB`);
            throw new Error(`El usuario con id '${reqAuthSub}' no existe en la database.`);
        }
    });
}
exports.throwErrorIfUserIsNotRegisteredInDB = throwErrorIfUserIsNotRegisteredInDB;
