import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ChannelStyle = styled.div`
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

function Channel({ activeRoomInfo }) {
  const {
    roomId,
    roomInfo: { roomTitle, owner }
  } = activeRoomInfo;

  return (
    <ChannelStyle>
      <Link to={`/main/:${roomId}`}>
        {roomTitle}{owner}
      </Link>
    </ChannelStyle>
  );
}

export default Channel;
