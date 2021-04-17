import React from "react";
import styled from "styled-components";

import mainIcon from "../../../assets/images/mainIcon.png";

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
  width: 35%;
  height: 100%;

  .welcomeheader-mainicon {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;

    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const AppTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-size: 50px;
  font-weight: bold;
`;

function WelComeHeader() {
  return (
    <WelComeHeaderStyle>
      <HeaderContainer>
        <div className="welcomeheader-mainicon">
          <img src={mainIcon} />
        </div>
        <AppTitleWrapper>GitCord</AppTitleWrapper>
      </HeaderContainer>
    </WelComeHeaderStyle>
  );
}

export default WelComeHeader;
