import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";

import {
  subscribeSocket,
  cancelSocketSubscription,
  socket
} from "../../config/socketConfig";

import MainNavbar from "./MainNavbar/MainNavbar";
import UserList from "./UserList/UserList";
import CodeEditor from "./CodeEditor/CodeEditor";
import Chat from "./Chat/Chat";

const MainOuter = styled.div`
  width: 100%;
  height: 100%;
  background-color: #F3F6FB;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

function Main() {
  const roomInfo = useSelector((state) => state.roomReducer);
  const currentUser = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("init", currentUser, roomInfo);

    return () => socket.emit("bye", currentUser.email, roomInfo.roomId);
  }, []);

  useEffect(() => {
    subscribeSocket(dispatch);

    return () => cancelSocketSubscription();
  }, []);

  if (roomInfo.isError) return <Redirect to="/error" />;
  if (!currentUser.email) return <Redirect to="/login" />;
  if (!roomInfo.roomId) return <Redirect to="/" />;

  return (
    <MainOuter>
      <MainNavbar
        currentUser={currentUser}
        roomInfo={roomInfo}
        socket={socket}
      />
      <MainContainer>
        <UserList
          currentUser={currentUser}
          roomInfo={roomInfo}
        />
        <CodeEditor />
        <Chat
          currentUser={currentUser}
          roomInfo={roomInfo}
          socket={socket}
        />
      </MainContainer>
    </MainOuter>
  );
}

export default Main;
