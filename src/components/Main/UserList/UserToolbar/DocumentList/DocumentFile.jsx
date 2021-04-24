import React, { useEffect } from "react";
import { FcFile } from "react-icons/fc";
import styled from "styled-components";

const DocumentFileContainer = styled.div`
  display: block;
  width: 30%;
  height: auto;
  font-size: 0.3rem;
  color: #000000;
`;

function DocumentFile({
  title,
  contents,
  socket,
  roomId,
  user,
  hideDocumentList
}) {
  useEffect(() => {
    const typingInfo = {
      typingUser: user,
      roomId
    };

    return () => {
      socket.emit("stop typing", typingInfo);
    };
  }, []);

  function handleFileClick() {
    const contentsInfo = {
      typingUser: user,
      value: contents,
      roomId
    };

    socket.emit("start typing", contentsInfo);
    hideDocumentList();
  }

  return (
    <DocumentFileContainer>
      <FcFile
        size={50}
        cursor="pointer"
        onClick={handleFileClick}
      />
      <div>
        {title}
      </div>
    </DocumentFileContainer>
  );
}

export default DocumentFile;
