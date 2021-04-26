import React, {
  useState,
  useRef,
  useEffect
} from "react";
import styled from "styled-components";

import getDate from "../../../utils/date";
import { SEND_CHAT } from "../../../constants/socketEvents";

import ChatInput from "./ChatInput/ChatInput";
import ChatLog from "./ChatLog/ChatLog";

const ChatContainer = styled.div`
  width: 18%;
  height: 80%;
  margin: 1em;
  background-color: #ffffff;
  border: 2px solid #C9D3DD;
  border-radius: 10px;
  text-align: center;

  .chat-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 10%;
    line-height: 10%;
    margin-left: 0.6em;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .chat-area {
    width: 100%;
    height: 80%;
    background-color: #F7F9FB;
    overflow-y: scroll;
  }
`;

function Chat({
  currentUser,
  roomId,
  chatLogs,
  socket
}) {
  const [chat, setChat] = useState("");
  const scrollRef = useRef();
  const { name, email } = currentUser;

  function scrollToBottom() {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom();
  }, [chatLogs]);

  function handleChatChange(event) {
    const { value } = event.target;

    setChat(value);
  }

  function handleChatSubmit(event) {
    event.preventDefault();

    const chatlogs = {
      chatTime: getDate(),
      userChat: chat,
      userName: name,
      userEmail: email,
      roomId
    };

    socket.emit(SEND_CHAT, chatlogs);
    setChat("");
  }

  function renderChatLogs() {
    return chatLogs.map((chatLog) => (
      <ChatLog
        user={currentUser}
        chatLog={chatLog}
      />
    ));
  }

  return (
    <ChatContainer>
      <article className="chat-title">
        Chat
      </article>
      <article
        ref={scrollRef}
        className="chat-area"
      >
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
