import io from "socket.io-client";

import { receiveChat } from "../actions/socketActions";

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
}
