import React from "react";
import styled from "styled-components";

import Channel from "./Channel/Channel";

const ChannelListContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 40vw;
  height: 60vh;
  padding-top: 8px;
  border: 3px solid #3B4755;
  border-radius: 10px;
  background-color: #3B4755;
  box-shadow: 0px 2px 5px black;
  overflow-y: scroll;
`;

function ChannelListContainer({ activedRooms, setRoomId }) {
  function renderActivedRooms() {
    return activedRooms.map((activedRoom) => {
      const [roomId, roomInfo] = activedRoom;

      function handleChannelClick() {
        setRoomId(roomId);
      }

      return (
        <Channel
          roomInfo={roomInfo}
          onClick={handleChannelClick}
        />
      );
    });
  }

  return (
    <ChannelListContainerStyle>
      {renderActivedRooms()}
    </ChannelListContainerStyle>
  );
}

export default ChannelListContainer;
