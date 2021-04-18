import produce from "immer";

import { ADD_USER } from "../constants/actionTypes";

const initialState = {
  user: ""
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return produce(state, draft => {
        draft.user = action.payload;
      });
    default:
      return state;
  }
}

export default userReducer;
