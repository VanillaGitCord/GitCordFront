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

  .chat-log {
    display: flex;
    justify-content: center;
    margin: 10px;
    font-size: 13px;
  }

  .chat-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 10%;
    line-height: 10%;
    margin: 0.5em;
    margin-left: 0.6em;
    border-bottom: 2px solid #C9D3DD;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .chat-area {
    width: 100%;
    height: 80%;
    overflow-y: scroll;
  }

  .main-icon {
    margin: 0.5em;
  }
`;

const socket = io.connect(
  process.env.REACT_APP_SERVER_URL,
  socketConnectionOptions
);

function Chat({ userInfo, roomInfo }) {
  const [chat, setChat] = useState("");
  const [chatLogs, setChatLogs] = useState([]);
  const { name } = userInfo;
  const { roomId } = roomInfo;

  useEffect(() => {
    socket.emit("join", roomId);

    socket.once("receive chat", (chatlog) => {
      const userChatLog = {
        chatTime: Date.now(),
        username: name,
        userChat: chatlog
      };
      const newChatLogs = [...chatLogs, userChatLog];

      setChatLogs(newChatLogs);
    });
  }, [chatLogs, name, roomId]);

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
        <article className="chat-log" key={chatTime}>
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
      <article className="chat-area">
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
