import React from "react";
import { useDispatch } from "react-redux";
import { CgLogOut } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

import { logoutUser } from "../../../actions/userActions";

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

function WelComeHeader({ currentUser }) {
  const dispatch = useDispatch();

  function handleLogoutIconClick() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    dispatch(logoutUser());
  }

  return (
    <WelComeHeaderStyle>
      <HeaderContainer>
        <MainIcon />
        <span className="nav-title">
          GitCord
        </span>
      </HeaderContainer>
      <HeaderContainer>
        <CgLogOut
          size={30}
          onClick={handleLogoutIconClick}
          cursor="pointer"
        />
        <FaUserCircle size={30} />
        {currentUser && currentUser.email}
      </HeaderContainer>
    </WelComeHeaderStyle>
  );
}

export default WelComeHeader;
