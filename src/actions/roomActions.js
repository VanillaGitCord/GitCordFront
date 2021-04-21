import {
  DELETE_ROOM,
  RECEIVE_CHAT,
  SET_ROOM_INFO,
  SET_ROOM_LIST,
  CLEAR_CHATLOGS
} from "../constants/actionTypes";

export function initRoomInfo(roomInfo) {
  return {
    type: SET_ROOM_INFO,
    payload: roomInfo
  };
}

export function initRoomList(activedRoomList) {
  return {
    type: SET_ROOM_LIST,
    payload: activedRoomList
  };
}

export function receiveChat(chatLogs) {
  return {
    type: RECEIVE_CHAT,
    payload: chatLogs
  };
}

export function clearChatLogs() {
  return {
    type: CLEAR_CHATLOGS
  };
}

export function deleteRoom() {
  return {
    type: DELETE_ROOM
  };
}
