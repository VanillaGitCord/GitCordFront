import {
  DELETE_ROOM,
  RECEIVE_CHAT,
  SET_ROOM_INFO,
  SET_ROOM_LIST,
  LEAVE_ROOM,
  RECEIVE_EDITOR_TEXT
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

export function receiveCodeText(text) {
  return {
    type: RECEIVE_EDITOR_TEXT,
    payload: text
  };
}

export function leaveRoom() {
  return {
    type: LEAVE_ROOM
  };
}

export function deleteRoom() {
  return {
    type: DELETE_ROOM
  };
}
