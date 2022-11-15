import { INewUser } from "../mongoDB/models/User";
import { IUser, IUserMDB } from "../types/user-types";
import {
  isEmail,
  isFalsyArgument,
  isStringBetween1And101CharsLong,
  isStringBetween1And50CharsLong,
  isValidURLImage,
} from "./generic-validators";

export function validateNewUser(
  idFromReq: any,
  nameFromReq: any,
  emailFromReq: any,
  profile_img: any
): INewUser {
  try {
    console.log(`Validating new user...`);
    const validatedNewUser: INewUser = {
      _id: checkUserId(idFromReq),
      name: checkUserName(nameFromReq),
      email: checkEmail(emailFromReq),
      profile_img: checkProfileImg(profile_img),
      animals: [],
      animalsPop: [],
      notes: [],
    };
    return validatedNewUser;
  } catch (error) {
    throw new Error("Error al validar el nuevo usuario.");
  }
}

// CHECK USER ID :
function checkUserId(idFromReq: any): string {
  if (isStringBetween1And101CharsLong(idFromReq)) {
    return idFromReq;
  } else {
    throw new Error(`Invalid user id`);
  }
}

// CHECK USER NAME :
function checkUserName(nameFromReq: any): string | undefined {
  if (isFalsyArgument(nameFromReq)) {
    return undefined;
  }
  if (isStringBetween1And50CharsLong(nameFromReq)) {
    return nameFromReq;
  } else {
    throw new Error(`El nombre ingresado '${nameFromReq}' es inválido.`);
  }
}

//CHECK VALID EMAIL :
export function checkEmail(emailFromReq: any): string {
  if (isEmail(emailFromReq)) {
    return emailFromReq;
  }
  throw new Error(`El email ingresado "${emailFromReq}" no es válido.`);
}

// CHECK PROFILE IMAGE :
export function checkProfileImg(profileImgFromReq: any): string | undefined {
  if (isFalsyArgument(profileImgFromReq)) {
    return undefined;
  }
  if (isValidURLImage(profileImgFromReq)) {
    return profileImgFromReq;
  }
  throw new Error(`Error al validar profile image.`);
}
