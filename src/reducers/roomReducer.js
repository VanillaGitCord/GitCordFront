import produce from "immer";

import {
  DELETE_ROOM,
  RECEIVE_CHAT,
  SET_ROOM_INFO,
  SET_ROOM_LIST,
  CLEAR_CHATLOGS
} from "../constants/actionTypes";

const initialState = {
  title: "",
  owner: "",
  contents: "",
  participants: [],
  chatLogs: [],
  activedRooms: [],
  isClosed: false
};

function roomReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOM_INFO: {
      const {
        roomTitle,
        participants,
        owner,
        contents
      } = action.payload;

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

    case CLEAR_CHATLOGS: {
      return produce(state, (draft) => {
        draft.chatLogs = [];
        draft.isClosed = false;
      });
    }

    case DELETE_ROOM: {
      return produce(state, (draft) => {
        draft.title = "";
        draft.owner = "";
        draft.contents = "";
        draft.participants = [];
        draft.chatLogs = [];
        draft.activedRooms = [];
        draft.isClosed = true;
      });
    }

    default: {
      return state;
    }
  }
}

export default roomReducer;
