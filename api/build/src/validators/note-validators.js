"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewNoteMDB = void 0;
const note_types_1 = require("../types/note-types");
const generic_validators_1 = require("./generic-validators");
function validateNewNoteMDB(bodyFromReq) {
    console.log("Validando nota con contenido del req.body");
    let newNoteObj = {
        // _id: bodyFromReq._id,
        title: checkTitle(bodyFromReq.title),
        theme: checkTheme(bodyFromReq.theme),
        comment: checkComment(bodyFromReq.comment),
        importance: checkImportance(bodyFromReq.importance),
    };
    return newNoteObj;
}
exports.validateNewNoteMDB = validateNewNoteMDB;
function checkTitle(titleFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(titleFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isStringBetween1AndXCharsLong)(50, titleFromReq)) {
        return titleFromReq;
    }
    throw new Error(`Error en aux fn checkTitle.`);
}
function checkTheme(themeFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(themeFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isStringBetween1AndXCharsLong)(40, themeFromReq)) {
        return themeFromReq;
    }
    throw new Error(`Error en aux fn checkTheme.`);
}
function checkComment(commentFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(commentFromReq)) {
        throw new Error(`Error en fn aux checkComment. El comentario no puede ser falsy.`);
    }
    if ((0, generic_validators_1.isStringBetween1AndXCharsLong)(250, commentFromReq)) {
        return commentFromReq;
    }
    throw new Error(`Error en aux fn checkComment`);
}
function checkImportance(importanceFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(importanceFromReq)) {
        return undefined;
    }
    if (Object.values(note_types_1.EImportance).includes(importanceFromReq)) {
        return importanceFromReq;
    }
    throw new Error(`Error en aux fn checkImportance.`);
}
