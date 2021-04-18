import produce from "immer";

import {
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE
} from "../constants/actionTypes";

const initialState = {
  roomId: "",
  isError: false
};

function roomReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM_SUCCESS:
      return produce(state, draft => {
        draft.roomId = action.payload;
      });

    case CREATE_ROOM_FAILURE:
      return produce(state, draft => {
        draft.isError = !draft.isError;
      });

    default:
      return state;
  }
}

export default roomReducer;
