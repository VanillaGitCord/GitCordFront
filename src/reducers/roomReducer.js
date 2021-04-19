import produce from "immer";

import {
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
  DELETE_ROOM,
  ENTER_ROOM,
  RECEIVE_CHAT
} from "../constants/actionTypes";

const initialState = {
  roomId: "",
  roomTitle: "",
  joinUsers: [],
  chatLogs: [],
  isError: false
};

function roomReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM_SUCCESS: {
      const { roomId, roomTitle } = action.payload;

      return produce(state, (draft) => {
        draft.roomId = roomId;
        draft.roomTitle = roomTitle;
      });
    }

    case ENTER_ROOM: {
      return produce(state, (draft) => {
        draft.roomId = action.payload;
      });
    }

    case CREATE_ROOM_FAILURE: {
      return produce(state, (draft) => {
        draft.isError = !draft.isError;
      });
    }

    case RECEIVE_CHAT: {
      return produce(state, draft => {
        draft.chatLogs.push(action.payload);
      });
    }

    case DELETE_ROOM: {
      return {
        ...initialState
      };
    }

    default: {
      return state;
    }
  }
}

export default roomReducer;
