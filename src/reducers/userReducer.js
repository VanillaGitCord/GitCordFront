import produce from "immer";

import { ADD_USER } from "../constants/userActionTypes";

const initialState = {
  roomId: ""
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return;
    default:
      return state;
  }
}

export default userReducer;
