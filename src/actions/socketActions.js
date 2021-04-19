import { RECEIVE_CHAT } from "../constants/actionTypes";

export function receiveChat(chatLogs) {
  return {
    type: RECEIVE_CHAT,
    payload: chatLogs
  };
}
