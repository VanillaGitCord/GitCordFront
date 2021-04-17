import React, { useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";

import ChatInput from "./ChatInput/ChatInput";

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
`;

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function Chat() {
  const [chat, setChat] = useState("");
  const [chatLogs, setChatLogs] = useState([]);

  useEffect(() => {
    socket.on("receive chat", (chatLog) => {
      setChatLogs(chatLog);
    });
  });

  function handleChangeChat(event) {
    const { value } = event.target;

    setChat(value);
  }

  function handleSubmitChat(event) {
    event.preventDefault();

    socket.emit("send chat", chat);
  }

  function renderChatLogs() {
    return chatLogs.map((chatLog, index) => (
      <div key={index}>
        {chatLog}
      </div>
    ));
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
        handleChangeChat={handleChangeChat}
        handleSubmitChat={handleSubmitChat}
      />
    </ChatContainer>
  );
}

export default Chat;
