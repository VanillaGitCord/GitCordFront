import {
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
  DELETE_ROOM,
  ENTER_ROOM,
  RECEIVE_CHAT
} from "../constants/actionTypes";

import { getNewRoomId } from "../api/roomApi";

function createRoomSuccess(roomInfo) {
  return {
    type: CREATE_ROOM_SUCCESS,
    payload: roomInfo
  };
}

function createRoomFailure() {
  return {
    type: CREATE_ROOM_FAILURE
  };
}

export function enterRoom(roomId) {
  return {
    type: ENTER_ROOM,
    payload: roomId
  }
}

export function receiveChat(chatLogs) {
  return {
    type: RECEIVE_CHAT,
    payload: chatLogs
  };
}

export function createRoom(payload) {
  return async (dispatch) => {
    try {
      const response = await getNewRoomId(payload);
      const {
        roomId,
        roomTitle,
        message,
        accessToken
      } = response;

      if (accessToken) {
        localStorage.removeItem("access");
        localStorage.setItem("access", accessToken);
      }

      if (message) return dispatch(createRoomFailure());

      dispatch(createRoomSuccess({ roomId, roomTitle }));
    } catch (err) {
      console.error(err);
      dispatch(createRoomFailure());
    }
  };
}

export function deleteRoom() {
  return {
    type: DELETE_ROOM
  };
}
