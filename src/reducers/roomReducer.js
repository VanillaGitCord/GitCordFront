import produce from "immer";

import {
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE
} from "../constants/actionTypes";

const initialState = {
  roomId: "",
  roomTitle: "",
  isError: false
};

function roomReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM_SUCCESS:
      const { roomId, roomTitle } = action.payload;

      return produce(state, draft => {
        draft.roomId = roomId;
        draft.roomTitle = roomTitle;
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
