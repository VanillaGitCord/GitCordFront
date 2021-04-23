import React from "react";
import styled from "styled-components";

import ModalBackground from "../../publicComponents/ModalBackground/ModalBackground";

const ChannelListGuideContainer = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: #ffffff;
`;

function ChannelListGuide() {
  return (
    <ModalBackground>
      <ChannelListGuideContainer>
        가이드 입니다.
      </ChannelListGuideContainer>
    </ModalBackground>
  );
}

export default ChannelListGuide;
