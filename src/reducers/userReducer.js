import produce from "immer";

import {
  USER_LOGIN,
  USER_LOGOUT
} from "../constants/actionTypes";

const initialState = {
  user: {
    email: "",
    name: ""
  }
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN: {
      return produce(state, draft => {
        draft.user = action.payload;
      });
    }

    case USER_LOGOUT: {
      return {
        ...initialState
      };
    }

    default: {
      return state;
    }
  }
}

export default userReducer;
