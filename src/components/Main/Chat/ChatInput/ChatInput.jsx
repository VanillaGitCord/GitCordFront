import React from "react";
import styled from "styled-components";

const ChatInputContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;

  .chat-input {
    display: block;
    width: 70%;
    padding: 1em;
    border: none;
    border-right: 1px solid #C9D3DD;
    outline: none;
  }

  .chat-button {
    display: block;
    width: 30%;
    height: 100%;
    margin: 0 auto;
    background: none;
    border: none;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    color: #c238eb;
    outline: none;
    cursor: pointer;
  }
`;

function ChatInput({
  chat,
  handleChatChange,
  handleChatSubmit
}) {
  return (
    <ChatInputContainer onSubmit={handleChatSubmit}>
      <input
        type="text"
        placeholder="message.."
        value={chat}
        onChange={handleChatChange}
        className="chat-input"
      />
      <button className="chat-button">
        send
      </button>
    </ChatInputContainer>
  );
}

export default ChatInput;
