import axios from "axios";
import { header } from "../../../constants/token";
import { URL_GET_USER_INFO } from "../../../constants/urls";
import { setUserInfo } from "./userSlice";

export function getUserInfo(token) {
  return async function (dispatch) {
    try {
      let response = await axios.get(URL_GET_USER_INFO, header(token));
      return dispatch(setUserInfo(response.data));
    } catch (error) {
      return dispatch(setUserInfo({ error: error.response?.data?.error }));
    }
  };
}
