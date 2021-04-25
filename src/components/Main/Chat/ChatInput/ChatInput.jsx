import React from "react";
import { AiOutlineEnter } from "react-icons/ai";
import styled from "styled-components";

const ChatInputContainer = styled.div`
  width: 100%;
  height: 10%;

  .chat-input {
    width: 50%;
    margin: 0.8em;
    border: 2px solid #c238eb;
    border-radius: 5px;
    outline: none;
  }

  .chat-button {
    background: none;
    border: 2px solid #c238eb;
    border-radius: 10px;
    cursor: pointer;
  }
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
          className="chat-input"
        />
        <button className="chat-button">
          <AiOutlineEnter />
        </button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;
