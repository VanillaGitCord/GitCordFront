import { ADD_USER } from "../constants/actionTypes";

export function addUser(userInfo) {
  return {
    type: ADD_USER,
    payload: userInfo
  };
}
