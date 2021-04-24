import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";

import { getDocuments } from "../../../../../api/documentApi";

import DocumentFile from "./DocumentFile";

const DocumentListContainer = styled.div`
  position: fixed;
  bottom: 23%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 18%;
  background-color: coral;
`;

function DocumentList({
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

  function renderMyDocuments() {
    return documents.map((document) => {
      const { title, contents } = document;

      return (
        <DocumentFile
          title={title}
          contents={contents}
          socket={socket}
          roomId={roomId}
          user={user}
          hideDocumentList={hideDocumentList}
        />
      );
    });
  }

  if (isError) return (
    <Redirect
      to={{
        pathname: "/error",
        state: { message: "알수 없는 에러가 발생했습니다" }
      }}
    />
  );


  return (
    <DocumentListContainer>
      {renderMyDocuments()}
    </DocumentListContainer>
  );
}

export default DocumentList;
