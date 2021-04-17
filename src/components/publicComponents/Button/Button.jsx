import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};

  button {
    width: 100%;
    height: 100%;
    border: 3px solid;
    border-radius: 5px;
    border-color: ${props => props.backgroundColor};
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
    font-size: 10px;
    font-weight: bold;
    box-shadow: 0px 0px 1px gray;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`;

function Button({
  width = "100%",
  height = "100%",
  onClick, content,
  backgroundColor = "white",
  color
}) {
  return (
    <ButtonStyle
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      color={color}
    >
      <button onClick={onClick}>{content}</button>
    </ButtonStyle>
  );
}

export default Button;