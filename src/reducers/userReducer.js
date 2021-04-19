import produce from "immer";

import {
  ADD_USER,
  DELETE_USER
} from "../constants/actionTypes";

const initialState = {
  user: {
    email: "",
    name: ""
  }
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      return produce(state, draft => {
        draft.user = action.payload;
      });
    }

    case DELETE_USER: {
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
