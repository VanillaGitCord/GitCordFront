import React from "react";
import styled from "styled-components";

import InputWithLabel from "../../publicComponents/InputWithLabel/InputWithLabel";
import Button from "../../publicComponents/Button/Button";

const LoginContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 40vw;
  height: 60vh;
  border: 3px solid #3B4755;
  border-radius: 10px;
  background-color: #3B4755;
  box-shadow: 0px 2px 5px black;

  .login-title {
    height: 10%;
    color: white;
    font-size: 30px;
    font-weight: bold;
  }

  .login-contents {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 60%;
    height: 70%;
  }

  .login-signup {
    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`;

function LoginContainer() {
  return (
    <LoginContainerStyle>
      <div className="login-title">Login</div>
      <div className="login-contents">
        <InputWithLabel
          labelContent="Email"
          placeholder="Type email here"
          height="20%"
        />
        <InputWithLabel
          labelContent="Password"
          placeholder="Type password"
          height="20%"
        />
        <Button
          content="LOGIN"
          width="40%"
          height="10%"
        />
        <Button
          content="GOOGLE LOGIN"
          width="40%"
          height="10%"
          backgroundColor="#0C59CF"
          color="white"
        />
        <a className="login-signup">Sign up</a>
      </div>
    </LoginContainerStyle>
  );
}

export default LoginContainer;
