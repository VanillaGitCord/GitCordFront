import io from "socket.io-client";

import {
  receiveChat,
  receiveDocumentText,
  receiveTypingInfo,
  initRoomInfo,
  initRoomList,
  deleteRoom,
  receiveTypingUsers
} from "../actions/roomActions";

export const socket = io.connect(
  process.env.REACT_APP_SERVER_URL
);

export function subscribeSocket(dispatch) {
  socket.on("receive chat", (chatInfo) => {
    dispatch(receiveChat(chatInfo));
  });

  socket.on("receive participants", (roomInfo) => {
    if (!roomInfo) return dispatch(deleteRoom());

    dispatch(initRoomInfo(roomInfo));
  });

  socket.on("receive targetRoomInfo", (roomInfo) => {
    dispatch(initRoomInfo(roomInfo));
  });

  socket.on("receive activeRoomList", (activedRoomList) => {
    dispatch(initRoomList(activedRoomList));
  });

  socket.on("receive filtered user list", (typingUsers) => {
    dispatch(receiveTypingUsers(typingUsers));
  });

  socket.on("receive text", (typingInfo) => {
    dispatch(receiveTypingInfo(typingInfo));
  });

  socket.on("receive document text", (text) => {
    dispatch(receiveDocumentText(text));
  });
}

export function cancelSocketSubscription() {
  socket.off("receive chat");
  socket.off("receive participants");
  socket.off("receive activeRoomList");
  socket.off("receive filtered user list");
  socket.off("receive text");
  socket.off("receive document text");
  socket.off("receive targetRoomInfo");
}
