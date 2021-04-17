import React, { useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";

import { socketConnectionOptions } from "../../../config/socketConfig";

import ChatInput from "./ChatInput/ChatInput";
import MainIcon from "../../publicComponents/MainIcon/MainIcon";

const ChatContainer = styled.div`
  width: 18%;
  height: 80%;
  margin: 1em;
  background-color: #ffffff;
  border: 2px solid #C9D3DD;
  border-radius: 10px;
  text-align: center;

  .chat-title {
    width: 100%;
    height: 10%;
    border-bottom: 1px solid #C9D3DD;
  }

  .chat-log {
    width: 100%;
    height: 80%;
  }

  .main-icon {
    margin: 5px;
  }

  .chatlog {
    display: flex;
    justify-content: center;
    margin: 10px;
    font-size: 13px;
  }
`;

const socket = io.connect(
  process.env.REACT_APP_SERVER_URL,
  socketConnectionOptions
);

function Chat() {
  const [chat, setChat] = useState("");
  const [username, setUsername] = useState("username");
  const [chatLogs, setChatLogs] = useState([]);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.once("socket Id", (socketId) => {
      setRoomId(socketId);
    });

    socket.once("receive chat", (chatlog) => {
      const userChatLog = {
        chatTime: Date.now(),
        username,
        userChat: chatlog
      };
      const newChatLogs = [...chatLogs, userChatLog];

      setChatLogs(newChatLogs);
    });
  }, [chatLogs, username]);

  function handleChatChange(event) {
    const { value } = event.target;

    setChat(value);
  }

  function handleChatSubmit(event) {
    event.preventDefault();

    socket.emit("send chat", chat, roomId);
    setChat("");
  }

  function renderChatLogs() {
    return chatLogs.map((chatLog) => {
      const { chatTime, username, userChat } = chatLog;

      return (
        <article className="chatlog" key={chatTime}>
          <div className="main-icon">
            <MainIcon width="20px" height="20px" />
          </div>
          <div>
            <span>{username}</span>
            <span>{chatTime}</span>
            <div>{userChat}</div>
          </div>
        </article>
      );
    });
  }

  return (
    <ChatContainer>
      <article className="chat-title">
        Chat
      </article>
      <article className="chat-log">
        {renderChatLogs()}
      </article>
      <ChatInput
        chat={chat}
        handleChatChange={handleChatChange}
        handleChatSubmit={handleChatSubmit}
      />
    </ChatContainer>
  );
}

export default Chat;
