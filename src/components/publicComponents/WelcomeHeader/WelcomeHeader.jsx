import React from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import styled from "styled-components";

import { logoutUser } from "../../../actions/userActions";

import MainIcon from "../../publicComponents/MainIcon/MainIcon";

const WelComeHeaderStyle = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

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

  .nav-title {
    font-size: 2.5rem;
  }

  .logout-icon {
    border-radius: 20%;
    transition: all .5s ease;
    cursor: pointer;

    &:hover {
      background: rgba(72, 219, 251, 0.6);
      box-shadow: 0px 0px 0px 5px rgba(72, 219, 251, 0.6);
    }
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
        <MainIcon
          width="60px"
          height="60px"
        />
        <span className="nav-title">
          GitCord
        </span>
      </HeaderContainer>
      <HeaderContainer>
        <CgLogOut
          size={30}
          onClick={handleLogoutIconClick}
          className="logout-icon"
        />
        <FaUserCircle size={30} />
        {currentUser && currentUser.email}
      </HeaderContainer>
    </WelComeHeaderStyle>
  );
}

export default WelComeHeader;
