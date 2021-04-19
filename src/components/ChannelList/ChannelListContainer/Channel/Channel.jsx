import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { enterRoom } from "../../../../actions/roomActions";

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
  const dispatch = useDispatch();
  const {
    roomId,
    roomInfo: { roomTitle, owner }
  } = activeRoomInfo;

  function handleEnterRoomClick() {
    dispatch(enterRoom(roomId));
  }

  return (
    <ChannelStyle onClick={handleEnterRoomClick}>
      {roomTitle}{owner}
    </ChannelStyle>
  );
}

export default Channel;
