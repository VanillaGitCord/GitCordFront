import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";

import { socket } from "../../config/socketConfig";

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

  useEffect(() => {
    // title과 접속한 user 정보를 set 해주어야한다.
    socket.emit("init", currentUser, roomInfo);
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
          socket={socket}
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
