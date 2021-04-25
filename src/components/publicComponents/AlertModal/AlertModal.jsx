import React, { useEffect } from "react";
import { AiFillAlert } from "react-icons/ai";
import styled from "styled-components";

const AlertModalWrapper = styled.div`
  position: fixed;
  bottom: 3rem;
  left: 3rem;
  width: 15em;
  height: auto;
`;

const AlertModalOuter = styled.div`
  @keyframes slide {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0%);
    }
  }

  width: 100%;
  height: 7%;
  padding: 0.5em;
  margin: 0 0 1em 0;
  background-color: rgb(250, 250, 250, 0.9);
  border-radius: 10px;
  animation: slide 0.2s ease-in;

  .alert-message {
    display: flex;
    justify-content: center;
    align-self: center;
    font-size: 0.8rem;
    font-weight: bold;
    color: ${props => props.color};
  }
`;

function AlertModal({
  alertMessages,
  handleAlertDelete,
  color = "#000000"
}) {
  useEffect(() => {
    const deleteAlert = setTimeout(() => {
      handleAlertDelete((alertMessages) => {
        alertMessages.shift();

        return [...alertMessages];
      });
    }, 1000);

    return () => clearTimeout(deleteAlert);
  }, [alertMessages, handleAlertDelete]);

  function renderMessages() {
    return alertMessages.map((message) => (
      <AlertModalOuter color={color}>
        <AiFillAlert size={20} />
        <span className="alert-message">
          {message}
        </span>
      </AlertModalOuter>
    ));
  }

  return (
    <AlertModalWrapper>
      {renderMessages()}
    </AlertModalWrapper>
  );
}

export default React.memo(AlertModal);
