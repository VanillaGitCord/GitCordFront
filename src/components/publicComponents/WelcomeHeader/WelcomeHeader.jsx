import React from "react";
import { GiExitDoor } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

import MainIcon from "../../publicComponents/MainIcon/MainIcon";

const WelComeHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100vw;
  height: 10vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 20%;
  height: 100%;
  font-size: 1.3rem;
  font-weight: bold;

  img {
    width: 60px;
    height: 60px;
  }

  .nav-title {
    font-size: 2.5rem;
  }
`;

function WelComeHeader({
  currentUser
}) {
  return (
    <WelComeHeaderStyle>
      <HeaderContainer>
        <MainIcon />
        <span className="nav-title">
          GitCord
        </span>
      </HeaderContainer>
      <HeaderContainer>
        <GiExitDoor
          size={30}
          cursor="pointer"
        />
        <FaUserCircle size={30} />
        {currentUser && currentUser.email}
      </HeaderContainer>
    </WelComeHeaderStyle>
  );
}

export default WelComeHeader;
