import React, { useState } from "react";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";

import { postGoogleLogin, putLogin } from "../../../api/userApi";
import { addUser } from "../../../actions/userActions";

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
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

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
      const response = await putLogin(loginInfo);

      if (response.caused) {
        if (response.caused === "email") return setEmailError(response.message);
        if (response.caused === "password") return setPasswordError(response.message);
      }

      if (response.status >= 400) throw new Error(response.message);

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      localStorage.setItem("access", response.accessToken);
      localStorage.setItem("refresh", response.refreshToken);

      dispatch(addUser({
        email: response.email,
        name: response.name
      }));

      setIsLoginSuccess(true);
    } catch (err) {
      setIsError(true);
    }
  }

  async function handleGoogleLoginClick(googleUserInfo) {
    const { profileObj } = googleUserInfo;

    try {
      const response = await postGoogleLogin(profileObj);

      localStorage.setItem("access", response.accessToken);
      localStorage.setItem("refresh", response.refreshToken);

      dispatch(addUser({
        email: response.email,
        name: response.name
      }));

      setIsLoginSuccess(true);
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
        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="GOOGLE LOGIN"
            onSuccess={handleGoogleLoginClick}
          />
        </div>
        <a className="login-signup" href="/signup">Sign up</a>
      </section>
      { isLoginSuccess && <Redirect to="/" /> }
      { isError && <Redirect to="/error" /> }
    </LoginContainerStyle>
  );
}

export default LoginContainer;
