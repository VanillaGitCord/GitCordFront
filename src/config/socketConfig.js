import io from "socket.io-client";

import {
  receiveChat,
  initRoomInfo,
  initRoomList
} from "../actions/roomActions";

const socketConnectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity",
  "timeout" : 10000,
  "transports" : ["websocket"]
};

export const socket = io.connect(
  process.env.REACT_APP_SERVER_URL,
  socketConnectionOptions
);

export function subscribeSocket(dispatch) {
  socket.on("receive chat", (chatInfo) => {
    dispatch(receiveChat(chatInfo));
  });

  socket.on("receive participants", (roomInfo) => {
    dispatch(initRoomInfo(roomInfo));
  });

  socket.on("receive activeRoomList", (activedRoomList) => {
    dispatch(initRoomList(activedRoomList));
  });
}
