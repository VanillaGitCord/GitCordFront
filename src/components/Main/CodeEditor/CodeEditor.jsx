import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback
} from "react";
import * as Y from "yjs";
import { CodemirrorBinding } from "y-codemirror";
import { WebrtcProvider } from "y-webrtc";
import CodeMirror from "codemirror";
import styled from "styled-components";
import { throttle } from "lodash";

import "codemirror/";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

import {
  START_TYPING,
  STOP_TYPING
} from "../../../constants/socketEvents";

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
  }

  .remote-caret > div {
    position: relative;
    font-size: 13px;
    font-weight: bold;
    line-height: normal;
    user-select: none;
    color: black;
    padding: 2px;
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

  const refreshTypingUser = useCallback(() => {
    const typingInfo = {
      typingUser: currentUser,
      roomId
    };

    socket.emit(STOP_TYPING, typingInfo);
  }, [currentUser, roomId, socket]);

  const throllingRefreshTypingUser = useMemo(() =>
    throttle(refreshTypingUser, 3000),
    [refreshTypingUser]
  );

  useEffect(() => {
    throllingRefreshTypingUser();
  }, []);

  const handleChange = useCallback(() => {
    const typingInfo = {
      value: "",
      typingUser: currentUser,
      roomId
    };

    socket.emit(START_TYPING, typingInfo);
  }, [currentUser, roomId, socket]);

  const throllingTypingUser = useMemo(() =>
    throttle(handleChange, 75),
    [handleChange]
  );

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

      editor.on("keypress", () => {
        throllingTypingUser();

        setTimeout(() => {
          throllingRefreshTypingUser();
        }, 2000);

        return () => throllingRefreshTypingUser;
      });

      provider = new WebrtcProvider(
        roomId,
        ydoc,
        {
          signaling: [process.env.REACT_APP_Y_SERVER_URL]
        }
      );

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
      <textarea
        ref={ref}
      />
      <article className="typing-user">
        { typingUsers.length > 0 && `${typingUsers.join(", ")} is typing...` }
      </article>
    </CodeEditorContainer>
  );
}

export default React.memo(CodeEditor);
