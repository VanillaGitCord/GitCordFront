import React from "react";
import styled from "styled-components";

const ChatInputContainer = styled.div`
  width: 100%;
  height: 10%;
  padding-top: 1em;
  border-top: 1px solid #FFEEF4;
`;

function ChatInput() {
  return (
    <ChatInputContainer>
      <input type="text" placeholder="chat.." />
      <button>채팅 입력</button>
    </ChatInputContainer>
  );
}

export default ChatInput;
