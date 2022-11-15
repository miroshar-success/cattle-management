"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProfileImg = exports.checkEmail = exports.validateNewUser = void 0;
const generic_validators_1 = require("./generic-validators");
function validateNewUser(idFromReq, nameFromReq, emailFromReq, profile_img) {
    try {
        console.log(`Validating new user...`);
        const validatedNewUser = {
            _id: checkUserId(idFromReq),
            name: checkUserName(nameFromReq),
            email: checkEmail(emailFromReq),
            profile_img: checkProfileImg(profile_img),
            animals: [],
            animalsPop: [],
            notes: [],
        };
        return validatedNewUser;
    }
    catch (error) {
        throw new Error("Error al validar el nuevo usuario.");
    }
}
exports.validateNewUser = validateNewUser;
// CHECK USER ID :
function checkUserId(idFromReq) {
    if ((0, generic_validators_1.isStringBetween1And101CharsLong)(idFromReq)) {
        return idFromReq;
    }
    else {
        throw new Error(`Invalid user id`);
    }
}
// CHECK USER NAME :
function checkUserName(nameFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(nameFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isStringBetween1And50CharsLong)(nameFromReq)) {
        return nameFromReq;
    }
    else {
        throw new Error(`El nombre ingresado '${nameFromReq}' es inválido.`);
    }
}
//CHECK VALID EMAIL :
function checkEmail(emailFromReq) {
    if ((0, generic_validators_1.isEmail)(emailFromReq)) {
        return emailFromReq;
    }
    throw new Error(`El email ingresado "${emailFromReq}" no es válido.`);
}
exports.checkEmail = checkEmail;
// CHECK PROFILE IMAGE :
function checkProfileImg(profileImgFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(profileImgFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isValidURLImage)(profileImgFromReq)) {
        return profileImgFromReq;
    }
    throw new Error(`Error al validar profile image.`);
}
exports.checkProfileImg = checkProfileImg;
