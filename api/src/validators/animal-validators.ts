import { IAnimal, ITypeOfAnimal } from "../types/animal-types";
import {
  isFalsyArgument,
  isStringBetween1And50CharsLong,
  isStringBetween1AndXCharsLong,
  isStringXCharsLong,
  isValidSenasaId,
  isValidURLImage,
} from "./generic-validators";

// CHECK ANIMAL :
// This function is the main function that validates the data received in the request for a POST of a new animal or a PUT for updating an Animal.
// It uses many other auxiliary functions to make sure all the data from the request is valid before trying to store a new Animal instance in the Data Base.
// This function not only checks de data, but algo parses de name by forcing an toLowerCase() so the names are saved in all lower cases for a couple of different reasons regarding speed, performance and better practices.
export function checkAnimal(bodyFromReq: any): IAnimal {
  try {
    console.log(`Checking Animal...`);
    const checkedAnimal = {
      id_senasa: checkId(bodyFromReq.id_senasa),
      type_of_animal: checkTypeOfAnimal(bodyFromReq.type_of_animal),
      breed_name: checkBreedName(bodyFromReq.breed_name),
      location: checkLocation(bodyFromReq.location),
      weight_kg: checkWeight(bodyFromReq.weight_kg),
      name: checkName(bodyFromReq.name),
      device_type: checkDeviceType(bodyFromReq.device_type),
      device_number: checkDeviceNumber(bodyFromReq.device_number),
      image_1: checkImage(bodyFromReq.image_1),
      image_2: checkImage(bodyFromReq.image_2),
      image_3: checkImage(bodyFromReq.image_3),
      comments: checkComments(bodyFromReq.comments),
      birthday: checkBirthday(bodyFromReq.birthday),
      is_pregnant: checkIsPregnant(bodyFromReq.is_pregnant),
      delivery_date: checkDeliveryDate(bodyFromReq.delivery_date),
    };
    return checkedAnimal;
  } catch (error: any) {
    console.log(`Error en fn checkNewAnimal. ${error.message}`);
    throw new Error(error.message);
  }
}

// CHECK DEVICE_TYPE :
function checkDeviceType(argFromReq: any): string {
  if (isStringBetween1And50CharsLong(argFromReq)) {
    return argFromReq.toLowerCase();
  } else {
    throw new Error(`El tipo de dispositivo "${argFromReq}" es inválido.`);
  }
}

// CHECK DEVICE_NUMBER :
function checkDeviceNumber(argFromReq: any): string {
  if (isStringXCharsLong(8, argFromReq)) {
    return argFromReq;
  } else {
    throw new Error(`El código de dispositivo "${argFromReq}" es inválido.`);
  }
}

// CHECK ID_SENASA :
function checkId(idFromReq: any): string {
  if (isValidSenasaId(idFromReq)) {
    return idFromReq;
  } else {
    throw new Error(`El id "${idFromReq}" ingresado es inválido.`);
  }
}

// CHECK TYPE OF ANIMAL:
export function isValidTypeOfAnimal(argument: any): boolean {
  return Object.values(ITypeOfAnimal).includes(argument);
}

function checkTypeOfAnimal(argFromReq: any): ITypeOfAnimal {
  if (isValidTypeOfAnimal(argFromReq)) {
    return argFromReq;
  } else {
    throw new Error(`El tipo de animal "${argFromReq}" ingresado es inválido.`);
  }
}

// CHECK BREED NAME :
function checkBreedName(breedNameFromReq: any): string | undefined {
  if (isFalsyArgument(breedNameFromReq)) {
    return undefined;
  }
  if (isStringBetween1And50CharsLong(breedNameFromReq)) {
    return breedNameFromReq.toLowerCase();
  }
  throw new Error(
    `El valor ingresado como raza (breed name) no es válido. Ingrese una cadena de texto o deje el valor vacío.`
  );
}

// CHECK LOCATION :
function checkLocation(locationFromReq: any): string | undefined {
  if (isFalsyArgument(locationFromReq)) {
    return undefined;
  }
  if (isStringBetween1And50CharsLong(locationFromReq)) {
    return locationFromReq.toLowerCase();
  }
  throw new Error(
    `El valor ingresado '${locationFromReq}' como location es inválido.`
  );
}

// CHECK WEIGHT_KG :
function checkWeight(argFromReq: any): number | undefined {
  if (isFalsyArgument(argFromReq)) {
    return undefined;
  }
  let parsedArg = Math.round(Number(argFromReq));

  if (parsedArg && typeof parsedArg === "number" && parsedArg > 0) {
    return parsedArg;
  }
  throw new Error(`The weight_kg "${argFromReq}" is invalid.`);
}

// CHECK NAME: (also forces lower cases)
function checkName(argFromReq: any): string | undefined {
  if (isFalsyArgument(argFromReq)) {
    return undefined;
  }
  if (isStringBetween1AndXCharsLong(200, argFromReq)) {
    return argFromReq.toLowerCase();
  } else {
    throw new Error(`The name "${argFromReq}" es invalid.`);
  }
}

// CHECK IMAGE :
function checkImage(imageFromReq: any): string | undefined {
  if (isFalsyArgument(imageFromReq)) {
    return undefined;
  }
  if (isValidURLImage(imageFromReq)) {
    return imageFromReq;
  }
  throw new Error(`La imagen ingresada '${imageFromReq}' no es válida.`);
}

// CHECK COMMENTS :
function checkComments(commentsFromReq: any): string | undefined {
  if (isFalsyArgument(commentsFromReq)) {
    return undefined;
  }
  if (isStringBetween1AndXCharsLong(3000, commentsFromReq)) {
    return commentsFromReq;
  }
  throw new Error(
    `El comentario ingresado es inválido. Ingrese un valor falso, o un string entre 1 y 3000 caracteres.`
  );
}

//! CHECK BIRTHDAY : (corregir validación de Date con librería externa)
function checkBirthday(birthdayFromReq: any): string | undefined {
  if (isFalsyArgument(birthdayFromReq)) {
    return undefined;
  }
  if (isStringXCharsLong(10, birthdayFromReq)) {
    return birthdayFromReq;
  }

  throw new Error(`Error al validar el birthday.`);
}

// CHECK IS PREGNANT :
function checkIsPregnant(isPregnantFromReq: any): boolean | undefined {
  if (isFalsyArgument(isPregnantFromReq)) {
    return undefined;
  }
  if (isPregnantFromReq === true || isPregnantFromReq === false) {
    return isPregnantFromReq;
  }
  if (isPregnantFromReq === "true") {
    return true;
  }
  if (isPregnantFromReq === "false") {
    return false;
  }
  throw new Error(
    `El dato ingresado '${isPregnantFromReq}' como 'isPregnant' es inválido.`
  );
}

//! CHECK DELIVERY DATE : (corregir validación de Date con librería externa)
function checkDeliveryDate(deliveryDateFromReq: any): string | undefined {
  if (isFalsyArgument(deliveryDateFromReq)) {
    return undefined;
  }
  if (isStringXCharsLong(10, deliveryDateFromReq)) {
    return deliveryDateFromReq;
  }
  throw new Error(`La fecha de parto '${deliveryDateFromReq} no es válida.`);
}
