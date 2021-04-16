import React from "react";
import styled from "styled-components";

const WelComeHeaderStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  width: 100vw;
  height: 10vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  width: 35%;
  height: 100%;
  margin-left: 10vw;
`;

function WelComeHeader() {
  return (
    <WelComeHeaderStyle>
      <HeaderContainer>
        <div>mainIcon</div>
        <div>Project Name</div>
      </HeaderContainer>
    </WelComeHeaderStyle>
  );
}

export default WelComeHeader;
