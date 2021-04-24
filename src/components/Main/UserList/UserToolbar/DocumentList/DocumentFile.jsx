import React from "react";
import { FcFile } from "react-icons/fc";
import { IoIosCloseCircle } from "react-icons/io";
import styled from "styled-components";

import { deleteDocument } from "../../../../../api/documentApi";

const DocumentFileContainer = styled.div`
  display: block;
  width: 20%;
  height: auto;
  font-size: 0.3rem;
  color: #000000;

  .close-icon {
    display: block;
    float: right;
  }
`;

function DocumentFile({
  alertMessages,
  setAlertMessages,
  title,
  contents,
  socket,
  roomId,
  documentId,
  hideDocumentList
}) {
  function handleFileClick() {
    const uploadMessage = "현재 방에 내용 업데이트를 했습니다.";
    const contentsInfo = {
      value: contents,
      roomId
    };

    socket.emit("set contents", contentsInfo);
    setAlertMessages([...alertMessages, uploadMessage]);
    hideDocumentList();
  }

  async function handleDeleteClick() {
    try {
      const response = await deleteDocument(documentId);

      setAlertMessages([...alertMessages, response.message]);
    } catch (err) {
      const errorMessage = "삭제에 실패했습니다.";

      setAlertMessages([...alertMessages, errorMessage]);
    }

    hideDocumentList();
  }

  return (
    <DocumentFileContainer>
      <IoIosCloseCircle
        size={15}
        className="close-icon"
        onClick={handleDeleteClick}
      />
      <FcFile
        size={50}
        cursor="pointer"
        onClick={handleFileClick}
      />
      <div>{title}</div>
    </DocumentFileContainer>
  );
}

export default DocumentFile;
