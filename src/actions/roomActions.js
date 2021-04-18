import {
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE
} from "../constants/actionTypes";

export function createRoom() {
  return {
    type: CREATE_ROOM
  };
}

export function createRoomSuccess(roomId) {
  return {
    type: CREATE_ROOM_SUCCESS,
    payload: roomId
  };
}

export function createRoomFailure() {
  return {
    type: CREATE_ROOM_FAILURE
  };
}
