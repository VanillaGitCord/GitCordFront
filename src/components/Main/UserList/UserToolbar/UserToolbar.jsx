import React, { useCallback, useState } from "react";
import { AiFillSave } from "react-icons/ai";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { VIDEO_TOGGLE } from "../../../../constants/socketEvents";

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
  setAlertMessages,
  socket,
  roomId,
  isVideoStopped,
  videoToggle
}) {
  const [isShowSavingToolbar, setIsShowSavingToolbar] = useState(false);
  const [isShowDocumentList, setIsShowDocumentList] = useState(false);
  const { contents } = useSelector((state) => state.roomReducer);

  const handleSaveButtonClick = useCallback(() => {
    setIsShowSavingToolbar((isShowSavingToolbar) => !isShowSavingToolbar);
  }, []);

  const handleDocumentListButtonClick = useCallback(() => {
    setIsShowDocumentList((isShowDocumentList) => !isShowDocumentList);
  }, []);

  const handleVideoToggleButtonClick = useCallback(() => {
    socket.emit(VIDEO_TOGGLE, roomId, user);
    videoToggle(isVideoStopped => !isVideoStopped);
  }, [roomId, user]);

  return (
    <UserToolbarContainer>
      {user.name}
      <article>
        {
          isVideoStopped
            ? <BsFillMicMuteFill
                size={25}
                className="toolbar-icon"
                onClick={handleVideoToggleButtonClick}
              />
            : <BsFillMicFill
                size={25}
                className="toolbar-icon"
                onClick={handleVideoToggleButtonClick}
              />
        }
        <GrDocumentText
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
      {
        isShowSavingToolbar &&
          <SavingToolbar
            alertMessages={alertMessages}
            setAlertMessages={setAlertMessages}
            contents={contents}
            user={user}
            hideToolbar={handleSaveButtonClick}
          />
      }
      {
        isShowDocumentList &&
          <DocumentList
            alertMessages={alertMessages}
            setAlertMessages={setAlertMessages}
            user={user}
            socket={socket}
            roomId={roomId}
            hideDocumentList={handleDocumentListButtonClick}
          />
      }
    </UserToolbarContainer>
  );
}

export default React.memo(UserToolbar);
