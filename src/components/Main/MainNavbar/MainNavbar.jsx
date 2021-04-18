import React from "react";
import { ImArrowLeft } from "react-icons/im";
import { GiExitDoor } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

import MainIcon from "../../publicComponents/MainIcon/MainIcon";

const MainNavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2%;

  .navbar-left {
    display: flex;
    justify-content: space-between;
    width: 15vw;
    height: 5vh;
    line-height: 5vh;
  }

  .navbar-right {
    display: flex;
    justify-content: space-evenly;
    width: 15vw;
    height: 5vh;
    line-height: 5vh;
  }
`;

function MainNavbar({ userInfo, roomInfo }) {
  const { email } = userInfo;
  const { roomTitle } = roomInfo;

  return (
    <MainNavbarContainer>
      <div className="navbar-left">
        <ImArrowLeft size={30} />
        <MainIcon width="30px" height="30px" />
        {roomTitle}
      </div>
      <div className="navbar-right">
        <GiExitDoor size={30} />
        <FaUserCircle size={30} />
        {email}
      </div>
    </MainNavbarContainer>
  );
}

export default MainNavbar;
