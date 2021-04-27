import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import PropTypes from "prop-types";

import { getDocuments } from "../../../../../api/documentApi";
import {
  UNKNOWN_ERROR,
  NOT_EXIST_SAVE_DOCUMENT
} from "../../../../../constants/message";

import DocumentFile from "./DocumentFile/DocumentFile";

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
  animation: slide .5s ease-in;
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
        state: { message: UNKNOWN_ERROR }
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
        : NOT_EXIST_SAVE_DOCUMENT
      }
    </DocumentListContainer>
  );
}

DocumentList.propTypes = {
  alertMessages: PropTypes.array.isRequired,
  setAlertMessages: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }),
  socket: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  hideDocumentList: PropTypes.func.isRequired
};

export default DocumentList;
