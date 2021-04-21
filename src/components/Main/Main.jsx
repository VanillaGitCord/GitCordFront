import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";

import {
  subscribeSocket,
  cancelSocketSubscription,
  socket
} from "../../config/socketConfig";
import { clearChatLogs } from "../../actions/roomActions";
import { addUser } from "../../actions/userActions";
import { postAuthToken } from "../../api/userApi";

import MainNavbar from "./MainNavbar/MainNavbar";
import UserList from "./UserList/UserList";
import CodeEditor from "./CodeEditor/CodeEditor";
import Chat from "./Chat/Chat";
import CamWindow from "./CamWindow/CamWindow";
import Background from "../publicComponents/Backgroud/Background";

const MainOuter = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
`;

function Main() {
  const [isAuthuticate, setIsAuthuticate] = useState(true);
  const {
    title,
    participants,
    contents,
    chatLogs,
    isError
  } = useSelector((state) => state.roomReducer);
  const currentUser = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    socket.emit("join", currentUser, roomId);

    return () => {
      dispatch(clearChatLogs());
      socket.emit("bye", currentUser.email, roomId);
    };
  }, []);

  useEffect(() => {
    const token = {
      accessToken: localStorage.getItem("access"),
      refreshToken: localStorage.getItem("refresh")
    };

    (async function checkUserInfo() {
      const response = await postAuthToken(token);
      const {
        user,
        message
      } = response;

      if (message) return setIsAuthuticate(false);

      dispatch(addUser(user));
    })();
  }, []);

  useEffect(() => {
    subscribeSocket(dispatch);

    return () => cancelSocketSubscription();
  }, []);

  return (
    <Background>
      <MainOuter>
        <MainNavbar
          currentUser={currentUser}
          roomTitle={title}
          roomId={roomId}
          socket={socket}
        />
        <MainContainer>
          <UserList
            currentUser={currentUser}
            userList={participants}
          />
          <CodeEditor
            socket={socket}
            roomId={roomId}
            contents={contents}
          />
          <Chat
            currentUser={currentUser}
            chatLogs={chatLogs}
            roomId={roomId}
            socket={socket}
          />
          {/* <CamWindow currentUser={currentUser} participants={participants}/> */}
        </MainContainer>
      </MainOuter>
    </Background>
  );
}

export default Main;
