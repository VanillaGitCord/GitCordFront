import React from "react";
import styled from "styled-components";

import MainNavbar from "./MainNavbar/MainNavbar";
import MainSidebar from "./UserList/UserList";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #F3F6FB;
`;

function Main() {
  return (
    <MainContainer>
      <MainNavbar />
      <MainSidebar />
    </MainContainer>
  );
}

export default Main;
