import React, { useEffect, useState } from "react";
import {
  Controlled as ControlledEditor
} from "react-codemirror2";
import styled from "styled-components";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript"

import CamWindow from "./CamWindow/CamWindow";

const CodeEditorContainer = styled.div`
  position: relative;
  width: 60%;
  height: 80%;
  margin: 1em;

  .CodeMirror {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

function CodeEditor({ socket }) {
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.emit("send codeEditor text", )
  });

  function handleChange(editor, data, value) {
    setCode(value);
  }

  return (
    <CodeEditorContainer>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={code}
        options={{
          lineWrapping: true,
          lint: true,
          mode: "javascript",
          theme: "material",
          lineNumbers: true
        }}
      />
      <CamWindow />
    </CodeEditorContainer>
  );
}

export default CodeEditor;
