import db from "../../models";
import { IUser } from "../../types/user-types";
import { isEmail } from "../../validators/generic-validators";
import { User } from "../../mongoDB/setup";

export async function emailExistsInDataBase(emailFromReq: any): Promise<void> {
  if (!isEmail(emailFromReq)) {
    throw new Error(
      `Error al chequear si el email existe en la DataBase: el email '${emailFromReq}' no tiene un formato de email válido.`
    );
  }
  let emailRegisteredAlready: IUser | null = await User.findOne({
    email: emailFromReq,
  });
  if (emailRegisteredAlready) {
    throw new Error(
      `El email '${emailFromReq}' ya se encuentra registrado en la Data Base. Nombre del usuario al que le pertenece ese email: '${emailRegisteredAlready.name}'`
    );
  }
}

export async function userIsRegisteredInDB(reqAuthSub: any): Promise<boolean> {
  if (!reqAuthSub) {
    throw new Error(`El req.auth.sub no puede ser falso.`);
  }
  if (typeof reqAuthSub !== "string") {
    throw new Error(`El req.auth.sub debe ser un string`);
  }
  const foundUserInDB = await User.findById(reqAuthSub);
  if (foundUserInDB) {
    return true;
  } else {
    return false;
  }
}

export async function throwErrorIfUserIsNotRegisteredInDB(
  reqAuthSub: any
): Promise<void> {
  if (!reqAuthSub) {
    throw new Error(`El req.auth.sub no puede ser falso.`);
  }
  if (typeof reqAuthSub !== "string") {
    throw new Error(`El req.auth.sub debe ser un string`);
  }
  const foundUserInDB = await User.findById(reqAuthSub);
  if (foundUserInDB) {
    return;
  } else {
    console.log(
      `Error! Usuario no encontrado en la DB en fn aux throwErrorIfUserIsNotRegisteredInDB`
    );
    throw new Error(
      `El usuario con id '${reqAuthSub}' no existe en la database.`
    );
  }
}
