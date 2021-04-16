import React from "react";
import styled from "styled-components";

import InputWithLabel from "../../publicComponents/InputWithLabel/InputWithLabel";
import Button from "../../publicComponents/Button/Button";

const LoginContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

  .login-inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    height: 30%;
  }
`;

function LoginContainer() {
  return (
    <LoginContainerStyle>
      <div className="login-title">Login</div>
      <div className="login-inputs">
        <InputWithLabel
          labelContent={"Email"}
          placeholder={"Type email here"}
          height="45%"
        />
        <InputWithLabel
          labelContent={"Password"}
          placeholder={"Type password"}
          height="45%"
        />
      </div>
      <div className="login-buttons">
        <Button />
        <Button />
      </div>
      <a className="login-signup">Sign up</a>
    </LoginContainerStyle>
  );
}

export default LoginContainer;
