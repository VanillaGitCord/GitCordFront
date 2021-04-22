import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { FaExclamation } from "react-icons/fa";

import mainIcon from "../../assets/images/mainIcon.png";

import Background from "../publicComponents/Backgroud/Background";

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 50%;

    &-text {
      font-size: 50px;
      font-weight: bold;
      color: rebeccapurple;

      &-count {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: red;
      }
    }
  }

  .container-picture {
    position: relative;

    &-exclamation {
      position: absolute;
      left: 100%;
      font-size: 100px;
      color: red;
      transform: translate(-20%, -20%);
      transform: rotate(15deg);
    }

    &-mainicon {
      width: 300px;
      height: 300px;
    }
  }
`;

function Error({ location }) {
  const {
    state: { message }
  } = location;
  const [count, setCount] = useState(3);

  useEffect(() => {
    setTimeout(() => {
      setCount(count => count - 1);
    }, 1000);
  }, [count]);

  if (count <= 0) return <Redirect to={"/"} />;

  return (
    <Background>
      <ModalBackground>
        <div className="container">
          <div className="container-picture">
            <FaExclamation className="container-picture-exclamation" />
            <img src={mainIcon} className="container-picture-mainicon" />
          </div>
          <div className="container-text">
            <div className="container-text-message">
              {message}
            </div>
            <div className="container-text-count">
              {count}
            </div>
          </div>
        </div>
      </ModalBackground>
    </Background>
  );
}

export default Error;
