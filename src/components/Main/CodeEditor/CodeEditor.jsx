import React, { useEffect, useRef } from "react";
import * as Y from "yjs";
import { CodemirrorBinding } from "y-codemirror";
import { WebrtcProvider } from "y-webrtc";
import CodeMirror from "codemirror";
import styled from "styled-components";

import "codemirror/";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

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

  .remote-caret {
    position: absolute;
    border-left: black;
    border-left-style: solid;
    border-left-width: 2px;
    height: 1em;
  }

  .remote-caret > div {
    position: relative;
    font-size: 13px;
    font-family: serif;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    user-select: none;
    color: black;
    padding-left: 2px;
    padding-right: 2px;
    z-index: 3;
  }
`;

function CodeEditor({
  currentUser,
  typingUsers,
  socket,
  roomId,
  contents
}) {
  const ref = useRef();

  useEffect(() => {
    let provider;

    if (ref) {
      const ydoc = new Y.Doc();
      const yText = ydoc.getText("codemirror");
      const yUndoManager = new Y.UndoManager(yText);
      const editor = CodeMirror.fromTextArea(ref.current, {
        mode: "javascript",
        lineNumbers: true,
        theme: "material",
        lint: true
      });

      provider = new WebrtcProvider(roomId, ydoc, {signaling: ["ws://localhost:4444"]});

      provider.awareness.setLocalState({
        user: {
          color: "yellow",
          name: currentUser.name
        }
      });

      new CodemirrorBinding(yText, editor, provider.awareness, { yUndoManager });
    }

    return () => provider.destroy();
  }, [ref]);

  return (
    <CodeEditorContainer>
      <textarea ref={ref}></textarea>
    </CodeEditorContainer>
  );
}

export default React.memo(CodeEditor);
