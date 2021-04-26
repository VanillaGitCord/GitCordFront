import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";

import { getDocuments } from "../../../../../api/documentApi";

import DocumentFile from "./DocumentFile";

const DocumentListContainer = styled.div`
  @keyframes slide {
    from {
      transform: translateX(-400%);
    }

    to {
      transform: translateX(0%);
    }
  }

  position: fixed;
  bottom: 23%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 16%;
  padding: 1em;
  background-color: #EEADCC;
  border-radius: 10px;
  animation: slide 1.5s ease-in;
`;

function DocumentList({
  alertMessages,
  setAlertMessages,
  user,
  socket,
  roomId,
  hideDocumentList
}) {
  const [documents, setDocuments] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async function getMydocuments() {
      try {
        const getDocumentResult = await getDocuments(user.email);

        setDocuments(getDocumentResult.documents);
      } catch (err) {
        setIsError(true);
      }
    })();
  }, []);

  if (isError) return (
    <Redirect
      to={{
        pathname: "/error",
        state: { message: "알수 없는 에러가 발생했습니다" }
      }}
    />
  );

  function renderMyDocuments() {
    return documents.map((document) => {
      const {
        title,
        contents,
        _id
      } = document;

      return (
        <DocumentFile
          alertMessages={alertMessages}
          setAlertMessages={setAlertMessages}
          title={title}
          contents={contents}
          socket={socket}
          roomId={roomId}
          documentId={_id}
          hideDocumentList={hideDocumentList}
        />
      );
    });
  }

  return (
    <DocumentListContainer>
      {0 < documents.length
        ? renderMyDocuments()
        : "저장한 문서가 없습니다."
      }
    </DocumentListContainer>
  );
}

export default DocumentList;
