import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";

import { getDocuments } from "../../../../../api/documentApi";
import {
  UNKNOWN_ERROR,
  NOT_EXIST_SAVE_DOCUMENT
} from "../../../../../constants/message";

import DocumentFile from "./DocumentFile/DocumentFile";
import Spinner from "../../../../publicComponents/Spinner/Spinner";

const DocumentListContainer = styled.div`
  position: fixed;
  left: 10%;
  bottom: 23%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 16%;
  padding: 1em;
  background-color: #FFFFFF;
  border: 5px solid #54a0ff;
  border-radius: 10px;
  box-shadow: 0px 3px 5px #414141;
  z-index: 9;
`;

function DocumentList({
  alertMessages,
  setAlertMessages,
  user,
  socket,
  roomId,
  hideDocumentList
}) {
  const [isDocumentReady, setIsDOcumentReady] = useState(false);
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
      setTimeout(() => {
        setIsDOcumentReady(true);
      }, 2000);
    })();
  }, []);

  if (isError) return (
    <Redirect
      to={{
        pathname: "/error",
        state: { message: UNKNOWN_ERROR }
      }}
    />
  );

  function renderMyDocuments() {
    if (!document.length) return NOT_EXIST_SAVE_DOCUMENT;

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
      {
        isDocumentReady
          ? renderMyDocuments()
          : <Spinner />
      }
    </DocumentListContainer>
  );
}

export default DocumentList;
