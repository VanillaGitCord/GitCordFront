import io from "socket.io-client";

import {
  receiveChat,
  initRoomInfo,
  initRoomList,
  deleteRoom,
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
}

export function cancelSocketSubscription() {
  socket.off("receive chat");
  socket.off("receive participants");
  socket.off("receive activeRoomList");
}
