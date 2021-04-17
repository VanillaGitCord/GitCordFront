import React from "react";
import styled from "styled-components";

import Background from "../publicComponents/Backgroud/Background";
import WelcomeHeader from "../publicComponents/WelcomeHeader/WelcomeHeader";
import SignUpContainer from "./SignUpContainer/SignUpContainer";

const SignUpOutter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function SignUp() {
  return (
    <Background>
      <SignUpOutter>
        <WelcomeHeader />
        <SignUpContainer />
      </SignUpOutter>
    </Background>
  );
}

export default SignUp;
