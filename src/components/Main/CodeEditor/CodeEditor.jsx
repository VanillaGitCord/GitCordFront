import React from "react";
import styled from "styled-components";

import CamWindow from "./CamWindow/CamWindow";

const CodeEditorContainer = styled.div`
  position: relative;
  width: 60%;
  height: 80%;
  margin: 1em;
  background-color: #3E4C5B;
`;

function CodeEditor() {
  return (
    <CodeEditorContainer>
      <CamWindow />
    </CodeEditorContainer>
  );
}

export default CodeEditor;
