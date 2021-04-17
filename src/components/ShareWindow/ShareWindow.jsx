import React from "react";
import { RiFileCopyLine } from "react-icons/ri";
import styled from "styled-components";

const ShareWindowContainer = styled.div`
  width: 15%;
  height: 8%;
  padding: 10px;
  background-color: #FF6623;
  text-align: center;

  span {
    display: block;
    margin-bottom: 5px;
    color: #ffffff;
    font-weight: bold;
  }

  input {
    margin-right: 10px;
  }

  .copy-icon {
    display: inline-block;
    padding-top: 10px;
    cursor: pointer;
  }
`;

function ShareWindow() {
  return (
    <ShareWindowContainer>
      <span>INVITE</span>
      <input type="text" readOnly />
      <div className="copy-icon">
        <RiFileCopyLine size={15} />
      </div>
    </ShareWindowContainer>
  );
}

export default ShareWindow;
