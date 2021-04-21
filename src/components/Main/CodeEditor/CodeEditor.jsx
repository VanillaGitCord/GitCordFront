import React, { useEffect, useState } from "react";
import {
  Controlled as ControlledEditor
} from "react-codemirror2";
import styled from "styled-components";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript"

const CodeEditorContainer = styled.div`
  position: relative;
  width: 60%;
  height: 80%;
  margin: 1em;

  .CodeMirror {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 5px;
    border-radius: 20px;
    overflow: hidden;
  }
`;

function CodeEditor({
  socket,
  roomId,
  contents
}) {
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(contents);
  }, [contents]);

  function handleChange(editor, data, value) {
    const payload = {
      value,
      roomId
    };

    setCode(value);
    socket.emit("send codeEditor text", payload);
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
    </CodeEditorContainer>
  );
}

export default CodeEditor;
