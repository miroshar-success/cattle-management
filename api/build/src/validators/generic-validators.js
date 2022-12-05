"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndParseDate = exports.stringToBoolean = exports.stringContainsURLs = exports.isValidURLImage = exports.isEmail = exports.isTypeofNumber = exports.isValidSenasaId = exports.isUndefinedOrNull = exports.isFalsyArgument = exports.isStringBetween1AndXCharsLong = exports.isStringBetween1And50CharsLong = exports.isStringBetween1And101CharsLong = exports.isEmptyString = exports.isValidString = exports.isStringXCharsLong = exports.isString = void 0;
const luxon_1 = require("luxon");
// IS STRING:
function isString(argumento) {
    if (typeof argumento !== "string") {
        return false;
    }
    return true;
}
exports.isString = isString;
// IS STRING X CHARS LONG:
function isStringXCharsLong(x, argument) {
    let error = `The argument "x" must be a positive number.`;
    if (!x || typeof x !== "number" || x < 1) {
        throw new Error(error);
    }
    if (argument && typeof argument === "string" && argument.length === x) {
        return true;
    }
    else {
        return false;
    }
}
exports.isStringXCharsLong = isStringXCharsLong;
// IS VALID STRING:
function isValidString(argumento) {
    if (typeof argumento === "string" && argumento.length > 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.isValidString = isValidString;
// IS EMPTY STRING:
function isEmptyString(argumento) {
    if (typeof argumento === "string" && argumento.length === 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.isEmptyString = isEmptyString;
// funcion auxiliar para chequear strings y su largo
function isStringBetween1And101CharsLong(argumento) {
    if (typeof argumento === "string" &&
        argumento.length >= 1 &&
        argumento.length <= 100) {
        return true;
    }
    return false;
}
exports.isStringBetween1And101CharsLong = isStringBetween1And101CharsLong;
// IS STRING BETWEEN 1 AND 50 CHARACTERS LONG:
function isStringBetween1And50CharsLong(argumento) {
    if (typeof argumento === "string" &&
        argumento.length > 0 &&
        argumento.length <= 50) {
        return true;
    }
    else {
        return false;
    }
}
exports.isStringBetween1And50CharsLong = isStringBetween1And50CharsLong;
// IS STRING BETWEEN 1 AND X CHARACTERS LONG:
function isStringBetween1AndXCharsLong(x, argumento) {
    let error = `The argument "x" must be a positive number`;
    if (!x || typeof x !== "number" || x < 1) {
        throw new Error(error);
    }
    let maxCharsLong = x;
    if (typeof argumento === "string" &&
        argumento.length >= 1 &&
        argumento.length <= maxCharsLong) {
        return true;
    }
    else {
        return false;
    }
}
exports.isStringBetween1AndXCharsLong = isStringBetween1AndXCharsLong;
// IS FALSY ARGUMENT
function isFalsyArgument(argumento) {
    if (!argumento) {
        return true;
    }
    else {
        return false;
    }
}
exports.isFalsyArgument = isFalsyArgument;
// is UNDEFINEDorNULL:
function isUndefinedOrNull(argumento) {
    if (argumento === undefined || argumento === null) {
        return true;
    }
    return false;
}
exports.isUndefinedOrNull = isUndefinedOrNull;
// IS VALID ID:
function isValidSenasaId(argumento) {
    if (typeof argumento === "string" && argumento.length === 16) {
        return true;
    }
    return false;
}
exports.isValidSenasaId = isValidSenasaId;
//IS TYPE OF NUMBER:
function isTypeofNumber(argumento) {
    if (typeof argumento === "number") {
        return true;
    }
    else {
        return false;
    }
}
exports.isTypeofNumber = isTypeofNumber;
//IS EMAIL :
function isEmail(argumento) {
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");
    return regex.test(argumento);
}
exports.isEmail = isEmail;
// IS VALID URL:
function isValidURLImage(argumento) {
    if (typeof argumento !== "string") {
        return false;
    }
    if (argumento.length > 250) {
        console.log("Error en val fn isValidURLImage. El argumento es demasiado largo.");
        throw new Error("The length of the url image is too long.");
    }
    let argTrimmed = argumento.trim();
    return (argTrimmed.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
        null);
}
exports.isValidURLImage = isValidURLImage;
// STRING CONTAINS URLS :
function stringContainsURLs(argumento) {
    if (argumento.length > 1000) {
        console.log("Error en fn val stringContainsURLs: El argumento es demasiado largo.");
        throw new Error("El argumento es demasiado largo.");
    }
    let argTrimmed = argumento.trim();
    if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(argTrimmed)) {
        return true;
    }
    else {
        return false;
    }
}
exports.stringContainsURLs = stringContainsURLs;
// PARSE STRING TO BOOLEAN :
function stringToBoolean(argumento) {
    if (argumento === "true") {
        return true;
    }
    if (argumento === "false") {
        return false;
    }
    throw new Error(`El argumento '${argumento}' es inválido.`);
}
exports.stringToBoolean = stringToBoolean;
function checkAndParseDate(dateFromReq) {
    try {
        let parsedAndValidated = luxon_1.DateTime.fromISO(dateFromReq);
        return parsedAndValidated.toJSDate();
    }
    catch (error) {
        console.log(`Error en checkAndParseDate. ${error.message}`);
        throw new Error(error.message);
    }
}
exports.checkAndParseDate = checkAndParseDate;
