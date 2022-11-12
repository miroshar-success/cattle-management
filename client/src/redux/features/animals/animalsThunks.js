import axios from "axios";
import { header } from "../../../constants/token";
import { URL, URL_GET_STATS, URL_GET_TYPES_OF_ANIMALS, URL_POST_ANIMAL, URL_SEARCH_QUERY } from "../../../constants/urls";
import { newAnimal, searchedAnimal, setAllAnimals, setDeleted, setDetail, setPregnant, setStats, setTypeOfAnimals, update } from "./animalsSlice";

export const createNewAnimal = (obj, token) => {
  return async function (dispatch) {
    try {
      let response = await axios.post(URL_POST_ANIMAL, obj, header(token));
      return dispatch(newAnimal(response.data));
    } catch (error) {
      return dispatch(newAnimal({ error: error.message }));
    }
  };
};

export const updateAnimal = (obj, token) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(URL + "animal/", obj, header(token));
      return dispatch(update(response.data));
    } catch (error) {
      dispatch(update({ error: "Error: " + error.response?.data?.error }));
    }
  };
};

export const getAllAnimals = (token) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(URL + "animal", header(token));
      return dispatch(setAllAnimals(response.data));
    } catch (error) {
      return dispatch(setAllAnimals({ error: error.message }));
    }
  };
};

export function searchQuery(value, token) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        URL_SEARCH_QUERY + `?value=${value}`,
        header(token)
      );
      return dispatch(
        searchedAnimal({
          result: [...response.data],
          status: { fetched: true },
        })
      );
    } catch (error) {
      return dispatch(
        searchedAnimal({ result: [], status: { error: error.message } })
      );
    }
  };
}

export function deleteAnimal(id, token) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        URL + "animal/delete/" + id,
        header(token)
      );
      return dispatch(setDeleted(response.data));
    } catch (error) {
      return dispatch(setDeleted({ error: error.message }));
    }
  };
}

export function getTypesOfAnimalsAllowed() {
  return async function (dispatch) {
    try {
      const response = await axios.get(URL_GET_TYPES_OF_ANIMALS);
      return dispatch(setTypeOfAnimals(response.data));
    } catch (error) {
      return dispatch(setTypeOfAnimals({ error: error.message }));
    }
  };
}

export function getStats(token) {
  return async function (dispatch) {
    try {
      const response = await axios.get(URL_GET_STATS, header(token));
      return dispatch(setStats(response.data));
    } catch (error) {
      return dispatch(setStats({ error: error.message }));
    }
  };
}

export function getPregnantAsc(token) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        URL + "animal/isPregnant?status=true&order=ASC",
        header(token)
      );
      return dispatch(setPregnant(response.data));
    } catch (error) {
      return dispatch(setPregnant({ error: error.message }));
    }
  };
}

export const getAnimalDetail = (id, token) => async (dispatch) => {
  try {
    const response = await axios.get(URL + "animal/id/" + id, header(token));
    return dispatch(setDetail(response.data));
  } catch (error) {
    return dispatch(setDetail({ error: error.message }));
  }
};