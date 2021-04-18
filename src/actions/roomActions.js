import {
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
  DELETE_ROOM
} from "../constants/actionTypes";

import { getNewRoomId } from "../api/roomApi";

function createRoomSuccess(roomId) {
  return {
    type: CREATE_ROOM_SUCCESS,
    payload: roomId
  };
}

function createRoomFailure() {
  return {
    type: CREATE_ROOM_FAILURE
  };
}

export function createRoom(payload) {
  return async (dispatch) => {
    try {
      const response = await getNewRoomId(payload);
      const {
        roomId,
        message,
        accessToken
      } = response;

      if (accessToken) {
        localStorage.removeItem("access");
        localStorage.setItem("access", accessToken);
      }

      if (message) return dispatch(createRoomFailure());

      dispatch(createRoomSuccess(roomId));
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
