import { IAnimal, ETypeOfAnimal } from "../../mongoDB/models/Animal";
import { getUserByIdOrThrowError } from "../user/user-r-auxiliary";

//NOTA: La función auxiliar getStats está en un archivo aparte: ./getStatsAuxFn.ts
// Lo dejé en un archivo aparte ya que es bastante grande y adentro de este archivo se hace muy voluminoso todo.

// TYPES OF ANIMALS TO ARRAY :
export function typesOfAnimalsToArray(): string[] {
  try {
    let typesParsedToArray: string[] = Object.values(ETypeOfAnimal);
    return typesParsedToArray;
  } catch (error: any) {
    console.log(`Error en fn typesOfAnimalsToArray. ${error.message}`);
    throw new Error(error.message);
  }
}

//GET PREGNANT IN DELIVERY ORDER :
export async function getPregnantInDeliveryDateOrder(user_id: string): Promise<{
  count: number;
  rows: IAnimal[];
}> {
  const userInDB = await getUserByIdOrThrowError(user_id);
  const userAnimals = userInDB.animals;

  let filteredPregnant: IAnimal[] = userAnimals.filter(
    (animal: IAnimal) => animal.is_pregnant === true
  );
  let copyOfFiltered = [...filteredPregnant];
  let sortedArray: IAnimal[] = copyOfFiltered.sort(
    (a: any, b: any) => a.delivery_date - b.delivery_date
  );
  return {
    count: sortedArray.length,
    rows: sortedArray,
  };
}
