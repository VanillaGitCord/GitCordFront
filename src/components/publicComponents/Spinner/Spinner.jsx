import React from "react";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .spinner {
    top: calc(50% - 12.5px);
    left: calc(50% - 12.5px);
    width: 25px;
    height: 25px;
    border-top: 8px solid aliceblue;
    border-right: 8px solid aliceblue;
    border-bottom: 8px solid aliceblue;
    border-left: 8px solid #8c618d;
    border-radius: 50%;
    animation-name: spin;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      border-left: 8px solid deeppink;
    }

    25% {
      transform: rotate(360deg);
      border-left: 8px solid gold;
    }

    50% {
      transform: rotate(720deg);
      border-left: 8px solid palegreen;
    }

    75% {
      transform: rotate(1080deg);
      border-left: 8px solid aqua;
    }

    100% {
      transform: rotate(1440deg);
      border-left: 8px solid deeppink;
    }
  }
`;

function Spinner() {
  return (
    <SpinnerContainer>
      <div className="backdrop">
        <div className="spinner" />
      </div>
    </SpinnerContainer>
  );
}

export default Spinner;
