import React, { useState } from "react";
import styled from "styled-components";

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

function Chat() {
  const [chat, setChat] = useState("");

  function handleChangeChat(event) {
    const { value } = event.target;

    setChat(value);
  }

  return (
    <ChatContainer>
      <article className="chat-title">
        Chat
      </article>
      <article className="chat-log">
        Chat log
      </article>
      <ChatInput
        chat={chat}
        handleChangeChat={handleChangeChat}
      />
    </ChatContainer>
  );
}

export default Chat;
