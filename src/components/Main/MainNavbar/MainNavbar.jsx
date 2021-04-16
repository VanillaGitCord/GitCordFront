import React from "react";
import { ImArrowLeft } from "react-icons/im";
import styled from "styled-components";

import MainIcon from "../../publicComponents/MainImage/MainImage";

const MainNavbarContainer = styled.div`
  display: flex;
`;

function MainNavbar() {
  return (
    <MainNavbarContainer>
      <ImArrowLeft size={30} />
      <MainIcon width="30px" height="30px" />
    </MainNavbarContainer>
  );
}

export default MainNavbar;
