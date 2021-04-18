import React, { useState } from "react";
import { Redirect } from "react-router";
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
    height: 80%;

    &-email {
      width: 100%;
      height: 20%;
    }

    &-password {
      width: 100%;
      height: 20%;
    }
  }

  .error {
    color: red;
    font-size: 15px;
    font-weight: bold;
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

function isEmailValidate(email) {
  return email.match(/\w+@\w+.\w+/g);
}

function LoginContainer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isError, setIsError] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleLoginClick() {
    if (!email) return setEmailError("E-mail을 입력해주세요!");

    if (!isEmailValidate(email)) return setEmailError("E-mail 형식을 맞춰주세요! ex) 123@asd.com");

    if (!password) return setPasswordError("Password를 입력해주세요!");

    const loginInfo = {
      email,
      password
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(loginInfo)
      });

      if (response.message) throw new Error(response.message);
    } catch (err) {
      setIsError(true);
    }
  }

  return (
    <LoginContainerStyle>
      <div className="login-title">Login</div>
      <section className="login-contents">
        <div className="login-contents-email">
          <InputWithLabel
            labelContent="Email"
            placeholder="Type email here"
            height="95%"
            onChange={handleEmailChange}
          />
          <div className="error">
            {emailError}
          </div>
        </div>
        <div className="login-contents-password">
          <InputWithLabel
            labelContent="Password"
            placeholder="Type password"
            height="95%"
            onChange={handlePasswordChange}
            type="password"
          />
          <div className="error">
            {passwordError}
          </div>
        </div>
        <Button
          content="LOGIN"
          width="40%"
          height="10%"
          onClick={handleLoginClick}
        />
        <Button
          content="GOOGLE LOGIN"
          width="40%"
          height="10%"
          backgroundColor="#0C59CF"
          color="white"
        />
        <a className="login-signup" href="/signup">Sign up</a>
      </section>
      { isError && <Redirect to="/error" /> }
    </LoginContainerStyle>
  );
}

export default LoginContainer;
