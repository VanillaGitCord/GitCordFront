import React from "react";
import styled from "styled-components";

import MainIcon from "../../publicComponents/MainIcon/MainIcon";

const WelComeHeaderStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  width: 100vw;
  height: 15vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  width: 17%;
  height: 100%;

  .welcomeheader-mainicon {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;

    img {
      width: 60px;
      height: 60px;
    }
  }
`;

const AppTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-size: 40px;
  font-weight: bold;
`;

function WelComeHeader() {
  return (
    <WelComeHeaderStyle>
      <HeaderContainer>
        <div className="welcomeheader-mainicon">
          <MainIcon />
        </div>
        <AppTitleWrapper>GitCord</AppTitleWrapper>
      </HeaderContainer>
    </WelComeHeaderStyle>
  );
}

export default WelComeHeader;
