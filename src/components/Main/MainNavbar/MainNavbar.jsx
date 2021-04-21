import React, { useState } from "react";
import { ImArrowLeft } from "react-icons/im";
import { GiExitDoor } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

import MainIcon from "../../publicComponents/MainIcon/MainIcon";
import { Redirect } from "react-router";

const MainNavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
  font-weight: bold;

  .navbar-left {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 15vw;
  }

  .navbar-right {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 20vw;

    &-logout {
      cursor: pointer;
    }
  }
`;

function MainNavbar({
  currentUser,
  roomTitle
}) {
  const { email } = currentUser;
  const [isOutRoom, setIsOutRoom] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  if (isOutRoom) return <Redirect to="/" />
  if (isLogout) return <Redirect to="/login" />

  function handleLogoutButtonClick() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setIsLogout(true);
  }

  function handleLeaveIconClick() {
    setIsOutRoom(true);
  }

  return (
    <MainNavbarContainer>
      <div className="navbar-left">
        <ImArrowLeft
          size={30}
          onClick={handleLeaveIconClick}
          cursor="pointer"
        />
        <MainIcon width="30px" height="30px" />
        {roomTitle}
      </div>
      <div className="navbar-right">
        <GiExitDoor
          size={30}
          onClick={handleLogoutButtonClick}
          cursor="pointer"
        />
        <FaUserCircle size={30} />
        {email}
      </div>
    </MainNavbarContainer>
  );
}

export default React.memo(MainNavbar);
