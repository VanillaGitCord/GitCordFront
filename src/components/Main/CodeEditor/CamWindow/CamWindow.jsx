import React from "react";
import { MdVideocam, MdVideocamOff } from "react-icons/md";
import styled from "styled-components";

import MainIcon from "../../../publicComponents/MainIcon/MainIcon";

const CamWindowContainer = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 20%;
  height: 20%;
  background-color: #ffffff;

  .cam-image {
    position: absolute;
    top: 5%;
    right: 5%;
  }
`;

function CamWindow() {
  return (
    <CamWindowContainer>
      <div className="CamWindow">
        <MainIcon width="80%" height="80%" />
        <MdVideocam className="cam-image" />
      </div>
    </CamWindowContainer>
  );
}

export default CamWindow;
