import produce from "immer";

import {
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
  DELETE_ROOM,
  ENTER_ROOM,
  RECEIVE_CHAT,
  SET_ROOM_INFO,
  SET_ROOM_LIST
} from "../constants/actionTypes";

const initialState = {
  title: "",
  owner: "",
  contents: "",
  participants: [],
  chatLogs: [],
  activedRooms: [],
  isError: false
};

function roomReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM_SUCCESS: {
      const { roomId, roomTitle } = action.payload;

      return produce(state, (draft) => {
        draft.roomId = roomId;
        draft.title = roomTitle;
      });
    }

    case CREATE_ROOM_FAILURE: {
      return produce(state, (draft) => {
        draft.isError = !draft.isError;
      });
    }

    case ENTER_ROOM: {
      return produce(state, (draft) => {
        draft.roomId = action.payload;
      });
    }

    case SET_ROOM_INFO: {
      const { roomTitle, participants, owner, contents } = action.payload;

      return produce(state, (draft) => {
        draft.title = roomTitle;
        draft.participants = participants;
        draft.owner = owner;
        draft.contents = contents;
      });
    }

    case SET_ROOM_LIST: {
      return produce(state, (draft) => {
        draft.activedRooms = action.payload;
      });
    }

    case RECEIVE_CHAT: {
      return produce(state, (draft) => {
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
