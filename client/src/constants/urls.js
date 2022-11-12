export const URL = `http://localhost:3001/`;
// export const URL = `https://cattle-tracker-production.up.railway.app/`;
export const URL_POST_ANIMAL = URL + "animal";
export const USER_EXISTS = URL + "user/existsInDB";
export const REGISTER_NEW_USER = URL + "user/register";
export const URL_SEARCH_QUERY = URL + "animal/search";
// la búsqueda por query debe realizarse de la siguiente manera:
// - se debe ingresar un nombre (name) o un id_senasa o un id de device_number. No deben introducirse valor mezclados
export const URL_GET_USER_INFO = URL + "user/userInfo";
export const URL_GET_TYPES_OF_ANIMALS = URL + "animal/typesAllowed";
export const URL_GET_STATS = URL + "animal/stats";
export const URL_UPDATE_ANIMAL = URL + `animal/`;
