import React, { useState } from "react";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { ImArrowLeft } from "react-icons/im";
import { CgLogOut } from "react-icons/cg";
import { FaUserCircle, FaShareAltSquare } from "react-icons/fa";
import styled from "styled-components";

import { logoutUser } from "../../../actions/userActions";

import MainIcon from "../../publicComponents/MainIcon/MainIcon";
import ShareWindow from "../../ShareWindow/ShareWindow";

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

  .share-window {
    position: absolute;
    display: inline-block;
    top: 4rem;
    right: 9rem;
    z-index: 5;
  }
`;

function MainNavbar({
  currentUser,
  roomTitle,
  roomId
}) {
  const { email } = currentUser;
  const [isOutRoom, setIsOutRoom] = useState(false);
  const [isShowShareWindow, setIsShowShareWindow] = useState(false);
  const dispatch = useDispatch();

  if (isOutRoom) return <Redirect to="/" />

  function handleLogoutIconClick() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    dispatch(logoutUser());
  }

  function handleLeaveIconClick() {
    setIsOutRoom(true);
  }

  function handleShareIconClick() {
    setIsShowShareWindow(!isShowShareWindow);
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
        <FaShareAltSquare
          size={30}
          onClick={handleShareIconClick}
          cursor="pointer"
        />
        <CgLogOut
          size={30}
          onClick={handleLogoutIconClick}
          cursor="pointer"
        />
        <FaUserCircle size={30} />
        {email}
        {isShowShareWindow &&
          <div className="share-window">
            <ShareWindow url={roomId}/>
          </div>
        }
      </div>
    </MainNavbarContainer>
  );
}

export default React.memo(MainNavbar);
