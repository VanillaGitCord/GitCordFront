import React, { useState } from "react";
import { AiFillSave } from "react-icons/ai";
import styled from "styled-components"

import { postDocument } from "../../../../../api/documentApi";

import InputWithLabelStyle from "../../../../publicComponents/InputWithLabel/InputWithLabel";

const SavingToolbarContainer = styled.div`
  position: fixed;
  left: 15%;
  bottom: 20%;
  display: flex;
  align-items: center;
  padding: 0.5em;
  background-color: #ED9ED1;
  border-radius: 10px;
  z-index: 10;
  outline: none;

  .save-icon {
    margin-left: 1em;
    color: #ffffff;
    cursor: pointer;
  }
`;

function SavingToolbar({
  contents,
  user,
  hideToolbar,
  alertMessages,
  setAlertMessages
}) {
  const [documentTitle, setDocumentTitle] = useState("");

  function handleDocumentTitleChange(event) {
    setDocumentTitle(event.target.value);
  }

  async function handleSaveIconClick() {
    const documentInfo = {
      contents,
      user: user.email
    };

    hideToolbar();

    try {
      const saveResult = await postDocument(documentInfo);

      setAlertMessages([...alertMessages, saveResult.message]);
    } catch (err) {
      setAlertMessages([...alertMessages, "문제가 발생했습니다"]);
    }
  }

  return (
    <SavingToolbarContainer>
      <InputWithLabelStyle
        width="20vh"
        heigth="10vh"
        placeholder="저장할 파일의 이름"
        onChange={handleDocumentTitleChange}
        value={documentTitle}
        type="text"
      />
      <AiFillSave
        size={30}
        className="save-icon"
        onClick={handleSaveIconClick}
      />
    </SavingToolbarContainer>
  );
}

export default SavingToolbar;