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
  handleChangeChat,
  handleSubmitChat
}) {
  return (
    <ChatInputContainer>
      <form onSubmit={handleSubmitChat}>
        <input
          type="text"
          placeholder="chat.."
          value={chat}
          onChange={handleChangeChat}
        />
        <button>채팅 입력</button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;
