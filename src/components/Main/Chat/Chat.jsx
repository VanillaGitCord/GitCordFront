import React from "react";
import styled from "styled-components";

import ChatInput from "./ChatInput/ChatInput";

const ChatContainer = styled.div`
  width: 18%;
  height: 80%;
  margin: 2%;
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
  return (
    <ChatContainer>
      <article className="chat-title">
        Chat
      </article>
      <article className="chat-log">
        Chat log
      </article>
      <ChatInput />
    </ChatContainer>
  );
}

export default Chat;
