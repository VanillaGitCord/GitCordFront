import React, { useEffect, useRef } from "react";
import * as Y from "yjs";
import { CodemirrorBinding } from "y-codemirror";
import { WebrtcProvider } from "y-webrtc";
import CodeMirror from "codemirror";
import "codemirror/";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import styled from "styled-components";

const TestContainer = styled.div`
  .remote-caret {
    position: absolute;
    border-left: black;
    border-left-style: solid;
    border-left-width: 2px;
    height: 1em;
  }

.remote-caret > div {
    position: relative;
    top: -1.05em;
    font-size: 13px;
    background-color: rgb(250, 129, 0);
    font-family: serif;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    user-select: none;
    color: white;
    padding-left: 2px;
    padding-right: 2px;
    z-index: 3;
  }
`;

function Test() {
  const ref = useRef();

  useEffect(() => {
    if (ref) {
      const ydoc = new Y.Doc();
      const provider = new WebrtcProvider('codemirror-demo-room', ydoc, {signaling: ["ws://localhost:4444"]});
      const yText = ydoc.getText('codemirror');
      const yUndoManager = new Y.UndoManager(yText);

      const editor = CodeMirror.fromTextArea(ref.current, {
        mode: 'javascript',
        lineNumbers: true,
        theme: "material",
        lint: true
      });

      const binding = new CodemirrorBinding(yText, editor, provider.awareness, { yUndoManager });
    }
  }, [ref]);

  return (
    <TestContainer>
      할수있따.
      <textarea ref={ref}></textarea>
    </TestContainer>
  );
}

export default Test;
