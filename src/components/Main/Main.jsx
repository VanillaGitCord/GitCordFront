import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";

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
  const roomId = useSelector((state) => state.roomReducer.roomId);
  const currentUser = useSelector((state) => state.userReducer.user);

  if (!currentUser.email) return <Redirect to="/login" />
  if (!roomId) return <Redirect to="/" />
  return (
    <MainOuter>
      <MainNavbar />
      <MainContainer>
        <UserList />
        <CodeEditor />
        <Chat />
      </MainContainer>
    </MainOuter>
  );
}

export default Main;
