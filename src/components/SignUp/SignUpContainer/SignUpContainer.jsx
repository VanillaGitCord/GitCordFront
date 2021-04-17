import React from "react";
import styled from "styled-components";

import InputWithLabel from "../../publicComponents/InputWithLabel/InputWithLabel";
import Button from "../../publicComponents/Button/Button";

const SignUpContainerStyle = styled.div`
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

  .signup-title {
    height: 10%;
    color: white;
    font-size: 30px;
    font-weight: bold;
  }

  .signup-inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    height: 70%;
  }
`;

function SignUpContainer() {
  return (
    <SignUpContainerStyle>
      <div className="signup-title">Sign Up</div>
      <div className="signup-inputs">
        <InputWithLabel
          labelContent="Email"
          placeholder="Type email here"
          height="20%"
        />
        <InputWithLabel
          labelContent="Email"
          placeholder="Type email here"
          height="20%"
        />
        <InputWithLabel
          labelContent="Email"
          placeholder="Type email here"
          height="20%"
        />
        <Button
          content="Sign Up"
          width="40%"
          height="10%"
        />
      </div>
    </SignUpContainerStyle>
  );
}

export default SignUpContainer;
