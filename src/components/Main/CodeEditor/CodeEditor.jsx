import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Controlled as ControlledEditor
} from "react-codemirror2";
import styled from "styled-components";
import { throttle } from "lodash";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript"

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
`;

function CodeEditor({
  currentUser,
  typingUsers,
  socket,
  roomId,
  contents
}) {
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
  }, [contents, throllingRefreshTypingUser]);

  const handleChange = useCallback((editor, data, value) => {
    const typingInfo = {
      value,
      typingUser: currentUser,
      roomId
    };

    socket.emit(START_TYPING, typingInfo);
  }, [currentUser, roomId, socket]);

  const throllingTypingUser = useMemo(() =>
    throttle(handleChange, 75),
    [handleChange]
  );

  return (
    <CodeEditorContainer>
      <ControlledEditor
        onBeforeChange={throllingTypingUser}
        value={contents}
        options={{
          lineWrapping: true,
          lineNumbers: true,
          lint: true,
          mode: "javascript",
          theme: "material",
          extraKeys: { Enter: false }
        }}
      />
      <article className="typing-user">
        {typingUsers.length > 0 && `${typingUsers.join(", ")} is typing...`}
      </article>
    </CodeEditorContainer>
  );
}

export default React.memo(CodeEditor);
