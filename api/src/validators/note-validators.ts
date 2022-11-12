import { EImportance, INote } from "../types/note-types";
import {
  isFalsyArgument,
  isStringBetween1AndXCharsLong,
} from "./generic-validators";

export function validateNewNote(bodyFromReq: any): INote {
  console.log("Validando nota con contenido del req.body");

  let newNoteObj: INote = {
    title: checkTitle(bodyFromReq.title),
    theme: checkTheme(bodyFromReq.theme),
    comment: checkComment(bodyFromReq.comment),
    importance: checkImportance(bodyFromReq.importance),
  };
  return newNoteObj;
}

function checkTitle(titleFromReq: any): string | undefined {
  if (isFalsyArgument(titleFromReq)) {
    return undefined;
  }
  if (isStringBetween1AndXCharsLong(50, titleFromReq)) {
    return titleFromReq;
  }
  throw new Error(`Error en aux fn checkTitle.`);
}

function checkTheme(themeFromReq: any): string | undefined {
  if (isFalsyArgument(themeFromReq)) {
    return undefined;
  }
  if (isStringBetween1AndXCharsLong(40, themeFromReq)) {
    return themeFromReq;
  }
  throw new Error(`Error en aux fn checkTheme.`);
}

function checkComment(commentFromReq: any): string {
  if (isFalsyArgument(commentFromReq)) {
    throw new Error(
      `Error en fn aux checkComment. El comentario no puede ser falsy.`
    );
  }
  if (isStringBetween1AndXCharsLong(250, commentFromReq)) {
    return commentFromReq;
  }
  throw new Error(`Error en aux fn checkComment`);
}

function checkImportance(importanceFromReq: any): EImportance | undefined {
  if (isFalsyArgument(importanceFromReq)) {
    return undefined;
  }
  if (Object.values(EImportance).includes(importanceFromReq)) {
    return importanceFromReq;
  }
  throw new Error(`Error en aux fn checkImportance.`);
}
