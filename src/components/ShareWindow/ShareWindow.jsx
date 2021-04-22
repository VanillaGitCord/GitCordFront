import React, { useRef } from "react";
import { RiFileCopyLine } from "react-icons/ri";
import styled from "styled-components";

const ShareWindowContainer = styled.div`
  width: 100%;
  height: 8%;
  padding: 10px;
  background-color: #FF6623;
  text-align: center;
  border-radius: 10px;

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

function ShareWindow({
  url,
  handleCopyButtonClick
}) {
  const textInput = useRef();

  function copyUrl() {
    const urlText = textInput.current;

    urlText.select();
    document.execCommand("copy");
    handleCopyButtonClick();
  }

  return (
    <ShareWindowContainer>
      <span>INVITE</span>
      <input
        ref={textInput}
        type="text"
        value={url}
        readOnly
      />
      <div className="copy-icon">
        <RiFileCopyLine
          size={15}
          onClick={copyUrl}
        />
      </div>
    </ShareWindowContainer>
  );
}

export default ShareWindow;
