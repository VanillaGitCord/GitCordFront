import React from "react";
import styled from "styled-components";

import Background from "../publicComponents/Backgroud/Background";
import WelcomeHeader from "../publicComponents/WelcomeHeader/WelcomeHeader";
import LoginContainer from "./LoginContainer/LoginContainer";

const LoginOutter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function Login() {
  return (
    <Background>
      <LoginOutter>
        <WelcomeHeader>
        </WelcomeHeader>
        <LoginContainer>
        </LoginContainer>
      </LoginOutter>
    </Background>
  );
}

export default Login;
