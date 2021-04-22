import React from "react";
import styled from "styled-components";

const ModalBackgroundStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
`;

function ModalBackground({ children }) {
  return (
    <ModalBackgroundStyle>
      {children}
    </ModalBackgroundStyle>
  );
}

export default ModalBackground;
