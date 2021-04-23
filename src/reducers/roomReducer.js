import produce from "immer";

import {
  DELETE_ROOM,
  RECEIVE_CHAT,
  SET_ROOM_INFO,
  SET_ROOM_LIST,
  LEAVE_ROOM,
  RECEIVE_EDITOR_TYPING_INFO,
  RECEIVE_EDITOR_TYPING_USERS
} from "../constants/actionTypes";

const initialState = {
  title: "",
  owner: {},
  contents: "",
  participants: [],
  chatLogs: [],
  typingUsers: [],
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
        draft.isClosed = false;
        draft.activedRooms = action.payload;
      });
    }

    case RECEIVE_CHAT: {
      return produce(state, (draft) => {
        draft.chatLogs.push(action.payload);
      });
    }

    case RECEIVE_EDITOR_TYPING_INFO: {
      const { text, typingUsers } = action.payload;

      return produce(state, (draft) => {
        draft.contents = text;
        draft.typingUsers = typingUsers;
      });
    }

    case RECEIVE_EDITOR_TYPING_USERS: {
      return produce(state, (draft) => {
        draft.typingUsers = action.payload;
      });
    }

    case LEAVE_ROOM: {
      return produce(state, (draft) => {
        draft.chatLogs = [];
        draft.typingUsers = [];
      });
    }

    case DELETE_ROOM: {
      return produce(state, (draft) => {
        draft.title = "";
        draft.owner = {};
        draft.contents = "";
        draft.participants = [];
        draft.chatLogs = [];
        draft.typingUsers = [];
        draft.isClosed = true;
      });
    }

    default: {
      return state;
    }
  }
}

export default roomReducer;
