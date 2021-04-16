import React from "react";
import MainNavbar from "./MainNavbar/MainNavbar";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #F3F6FB;
`;

function Main() {
  return (
    <MainContainer>
      <MainNavbar />
    </MainContainer>
  );
}

export default Main;
