import React from "react";
import styled from "styled-components";

const ChannelStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  height: 15%;
  background-color: white;
  margin-bottom: 20px;
  border: 3px solid #C9D3DD;
  border-radius: 8px;
  cursor: pointer;
  color: #000000;

  &:hover {
    opacity: 0.8;
  }
`;

function Channel({ roomInfo, onClick }) {
  const { roomTitle, owner } = roomInfo;
  return (
    <ChannelStyle onClick={onClick}>
      <span>채널 명: {roomTitle}</span>
      <br />
      <span>방장: {owner.email}</span>
    </ChannelStyle>
  );
}

export default Channel;
