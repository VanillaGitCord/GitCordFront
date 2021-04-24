import React, { useState } from "react";
import styled from "styled-components";

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

function Chat({
  currentUser,
  roomId,
  chatLogs,
  socket
}) {
  const [chat, setChat] = useState("");
  const { name } = currentUser;

  function handleChatChange(event) {
    const { value } = event.target;

    setChat(value);
  }

  function handleChatSubmit(event) {
    event.preventDefault();

    const chatlogs = {
      chatTime: Date.now(),
      userChat: chat,
      userName: name,
      roomId
    };

    socket.emit("send chat", chatlogs);
    setChat("");
  }

  function renderChatLogs() {
    return chatLogs.map((chatLog) => {
      const { chatTime, userName, userChat } = chatLog;

      return (
        <article className="chat-log" key={chatTime}>
          <div className="main-icon">
            <MainIcon width="20px" height="20px" />
          </div>
          <div>
            <span>{userName}</span>
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

export default React.memo(Chat);
