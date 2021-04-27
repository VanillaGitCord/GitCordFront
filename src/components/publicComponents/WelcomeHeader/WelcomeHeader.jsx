import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import styled from "styled-components";

import useLogout from "../../customHooks/useLogout";

import MainIcon from "../../publicComponents/MainIcon/MainIcon";
import { Redirect } from "react-router";

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

function WelComeHeader({ currentUser, isLogin = true }) {
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();
  const handleLogoutIconClick = useLogout(dispatch, setIsLogout);

  const getLogoutButtonAndUserInfo = useCallback(() => {
    if (isLogin) {
      return (
        <>
          <CgLogOut
            size={30}
            onClick={handleLogoutIconClick}
            className="logout-icon"
          />
          <FaUserCircle size={30} />
          {currentUser && currentUser.email}
        </>
      );
    }
  }, [isLogin, handleLogoutIconClick, currentUser]);

  if (isLogout) return <Redirect to="/login" />;

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
        {getLogoutButtonAndUserInfo()}
      </HeaderContainer>
    </WelComeHeaderStyle>
  );
}

export default React.memo(WelComeHeader);
