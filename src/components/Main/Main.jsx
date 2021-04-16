import React from "react";
import styled from "styled-components";

import MainNavbar from "./MainNavbar/MainNavbar";
import MainSidebar from "./UserList/UserList";
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
  return (
    <MainOuter>
      <MainNavbar />
      <MainContainer>
        <MainSidebar />
        <Chat />
      </MainContainer>
    </MainOuter>
  );
}

export default Main;
