import React, { useEffect } from "react";
import styled from "styled-components";

const DocumentListContainer = styled.div`
  position: fixed;
  bottom: 20%;
  display: flex;
  flex-wrap: wrap;
  width: 15%;
  background-color: green;
`;

function DocumentList() {
  useEffect(() => {

  });

  return (
    <DocumentListContainer>
      확인
    </DocumentListContainer>
  );
}

export default DocumentList;
