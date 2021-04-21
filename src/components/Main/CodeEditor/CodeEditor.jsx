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

  .typing-user {
    position: absolute;
    left: 1rem;
    bottom: 0;
    color: #ffffff;
    z-index: 4;
  }
`;

function CodeEditor({
  currentUser,
  typingUsers,
  socket,
  roomId,
  contents
}) {
  const [code, setCode] = useState("");

  useEffect(() => {
    const typingInfo = {
      typingUser: currentUser.name,
      roomId
    }
    const stopTyping = setTimeout(() => {
      socket.emit("stop typing", typingInfo);
    }, 2000);

    setCode(contents);
    return () => {
      clearTimeout(stopTyping);}
  }, [contents, currentUser, socket, roomId]);

  function handleChange(editor, data, value) {
    const typingInfo = {
      value,
      typingUser: currentUser.name,
      roomId
    };

    setCode(value);
    socket.emit("start typing", typingInfo);
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
      <article className="typing-user">
        {typingUsers.length > 0 && `${typingUsers.join(", ")} is typing...`}
      </article>
    </CodeEditorContainer>
  );
}

export default React.memo(CodeEditor);
