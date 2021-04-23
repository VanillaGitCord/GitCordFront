import React from "react";
import styled from "styled-components";

import ModalBackground from "../ModalBackground/ModalBackground";

const GuideModalContainer = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: #ffffff;
`;

function GuideModal() {
  return (
    <ModalBackground>
      <GuideModalContainer>
        유저 가이드입니다.
      </GuideModalContainer>
    </ModalBackground>
  );
}

export default GuideModal;
