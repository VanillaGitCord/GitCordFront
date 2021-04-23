import React, { useState } from "react";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillSave
} from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { GiSpeaker } from "react-icons/gi";
import { useSelector } from "react-redux";
import styled from "styled-components";

import SavingToolbar from "./SavingToolbar/SavingToolbar";
import DocumentList from "./DocumentList/DocumentList";

const UserToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 10%;
  background-color: #FFEEF4;
  bottom: 0;
  border-radius: 10px;
  font-weight: bold;

  .toolbar-icon {
    margin: 10px;
    cursor: pointer;
  }
`;

function UserToolbar({
  user,
  alertMessages,
  setAlertMessages
}) {
  const [isShowSavingToolbar, setIsShowSavingToolbar] = useState(false);
  const [isShowDocumentList, setIsShowDocumentList] = useState(false);
  const { contents } = useSelector((state) => state.roomReducer);

  function handleSaveButtonClick() {
    setIsShowSavingToolbar((isShowSavingToolbar) => !isShowSavingToolbar);
  }

  function handleDocumentListButtonClick() {
    setIsShowDocumentList((isShowDocumentList) => !isShowDocumentList);
  }

  return (
    <UserToolbarContainer>
      <article>
        <GiSpeaker size={25} className="toolbar-icon" />
        <BsFillMicFill size={25} className="toolbar-icon" />
        <AiFillCaretLeft size={25} className="toolbar-icon" />
        <AiFillCaretRight
          size={25}
          className="toolbar-icon"
          onClick={handleDocumentListButtonClick}
        />
        <AiFillSave
          size={25}
          className="toolbar-icon"
          onClick={handleSaveButtonClick}
        />
      </article>
      {isShowSavingToolbar &&
        <SavingToolbar
          alertMessages={alertMessages}
          setAlertMessages={setAlertMessages}
          contents={contents}
          user={user}
          hideToolbar={handleSaveButtonClick}
        />
      }
      {isShowDocumentList && <DocumentList />}
    </UserToolbarContainer>
  );
}

export default UserToolbar;
