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

    &-logout {
      cursor: pointer;
    }
  }
`;

function MainNavbar({
  currentUser,
  roomTitle,
  roomId,
  socket
}) {
  const { email } = currentUser;
  const [isOutRoom, setIsOutRoom] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  if (isOutRoom) return <Redirect to="/" />
  if (isLogout) return <Redirect to="/login" />

  function handleLogoutButtonClick() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    socket.emit("bye", email, roomId);
    setIsLogout(true);
  }

  function handleMainIconClick() {
    socket.emit("bye", email, roomId);
    setIsOutRoom(true);
  }

  return (
    <MainNavbarContainer>
      <div className="navbar-left">
        <ImArrowLeft size={30} />
        <div onClick={handleMainIconClick}>
          <MainIcon width="30px" height="30px" />
          {roomTitle}
        </div>
      </div>
      <div className="navbar-right">
        <GiExitDoor
          className="navbar-right-logout"
          size={30}
          onClick={handleLogoutButtonClick}
        />
        <FaUserCircle size={30} />
        {email}
      </div>
    </MainNavbarContainer>
  );
}

export default MainNavbar;
