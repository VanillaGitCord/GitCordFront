import React from "react";
import styled from "styled-components";

const ChatInputContainer = styled.div`
  width: 100%;
  height: 10%;
  padding-top: 1em;
  border-top: 1px solid #FFEEF4;
`;

function ChatInput({
  chat,
  handleChatChange,
  handleChatSubmit
}) {
  return (
    <ChatInputContainer>
      <form onSubmit={handleChatSubmit}>
        <input
          type="text"
          placeholder="chat.."
          value={chat}
          onChange={handleChatChange}
        />
        <button>채팅 입력</button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;
