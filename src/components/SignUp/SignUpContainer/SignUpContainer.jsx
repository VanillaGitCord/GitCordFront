import React, { useState } from "react";
import styled from "styled-components";

import InputWithLabel from "../../publicComponents/InputWithLabel/InputWithLabel";
import Button from "../../publicComponents/Button/Button";
import { Redirect } from "react-router";

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

    &-email {
      width: 100%;
      height: 25%;
    }

    &-password {
      width: 100%;
      height: 25%;
    }

    &-name {
      width: 100%;
      height: 25%;
    }
  }

  .error {
    color: red;
    font-size: 15px;
    font-weight: bold;
  }
`;

function SignUpContainer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("email");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("asadf");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("asdf");
  const [isError, setIsError] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  async function handleButtonClick() {
    if (!email) return setEmailError("E-mail을 입력해주세요!");

    if (!email.match(/\w+@\w+.\w+/g)) return setEmailError("E-mail 형식을 맞춰주세요! ex) 123@asd.com");

    if (!password) return setPasswordError("Password를 입력해주세요!");

    if (!password.match(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,16}$/g)) return setPassword("비밀번호는 4~16자로 영소문자, 숫자, 특수문자를 포함해주세요!");

    if (!name) return setNameError("Name을 입력해주세요!");

    const newUser = {
      email,
      password,
      name
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
      });

      if (response.message) throw new Error(response.message);
    } catch (err) {
      setIsError(true);
    }
  }

  return (
    <SignUpContainerStyle>
      <label className="signup-title">Sign Up</label>
      <section className="signup-inputs">
        <div className="signup-inputs-email">
          <InputWithLabel
            labelContent="Email"
            placeholder="Type email here"
            height="90%"
            onChange={handleEmailChange}
          />
          <div className="error">
            {emailError}
          </div>
        </div>
        <div className="signup-inputs-password">
          <InputWithLabel
            labelContent="Password"
            placeholder="Type Password here"
            height="90%"
            onChange={handlePasswordChange}
          />
          <div className="error">
            {passwordError}
          </div>
        </div>
        <div className="signup-inputs-name">
          <InputWithLabel
            labelContent="Name"
            placeholder="Type Name here"
            height="90%"
            onChange={handleNameChange}
          />
          <div className="error">
            {nameError}
          </div>
        </div>
        <Button
          content="Sign Up"
          width="40%"
          height="10%"
          onClick={handleButtonClick}
        />
      </section>
      { isError && <Redirect to="/error" /> }
    </SignUpContainerStyle>
  );
}

export default SignUpContainer;
