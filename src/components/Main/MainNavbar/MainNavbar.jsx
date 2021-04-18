import React from "react";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { ImArrowLeft } from "react-icons/im";
import { GiExitDoor } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

import { deleteUser } from "../../../actions/userActions";
import { deleteRoom } from "../../../actions/roomActions";

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

    &-logout {
      cursor: pointer;
    }
  }
`;

function MainNavbar() {
  const dispatch = useDispatch();

  function handleLogoutButtonClick() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    dispatch(deleteUser());
    dispatch(deleteRoom());
    return <Redirect to="/login" />;
  }

  return (
    <MainNavbarContainer>
      <div className="navbar-left">
        <ImArrowLeft size={30} />
        <MainIcon width="30px" height="30px" />
        Room name
      </div>
      <div className="navbar-right">
        <GiExitDoor
          className="navbar-right-logout"
          size={30}
          onClick={handleLogoutButtonClick}
        />
        <FaUserCircle size={30} />
        User email
      </div>
    </MainNavbarContainer>
  );
}

export default MainNavbar;
