import { ADD_USER, DELETE_USER } from "../constants/actionTypes";

export function addUser(userInfo) {
  return {
    type: ADD_USER,
    payload: userInfo
  };
}

export function deleteUser() {
  return {
    type: DELETE_USER
  };
}
