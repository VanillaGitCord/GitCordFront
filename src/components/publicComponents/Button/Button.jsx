import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.div`

`;


function Button({ onClick, content }) {
  return (
    <ButtonStyle>
      <button onClick={onClick}>{content}</button>
    </ButtonStyle>
  );
}

export default Button;
