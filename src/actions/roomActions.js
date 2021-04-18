import {
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE
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

export function createRoom(roomInfo) {
  return async (dispatch) => {
    try {
      const response = await getNewRoomId(roomInfo);
      const { roomId, message } = response;

      if (message) return dispatch(createRoomFailure());

      dispatch(createRoomSuccess(roomId));
    } catch (err) {
      console.error(err);
      dispatch(createRoomFailure());
    }
  };
}
