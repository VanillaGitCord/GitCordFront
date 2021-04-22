import React from "react";
import { SiDatadog } from "react-icons/si";
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
  color: white;

  .unactivate-room {
    margin: auto;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;

    &-text {
      margin-top: 1em;
    }
  }
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

  function renderUnActivatedRooms() {
    return (
      <article className="unactivate-room">
        <SiDatadog
          color="#9de8ff"
          size={300}
        />
        <div className="unactivate-room-text">
          활성화된 방이 없습니다
        </div>
      </article>
    );
  }

  return (
    <ChannelListContainerStyle>
      {0 < activedRooms.length
        ? renderActivedRooms()
        : renderUnActivatedRooms()
      }
    </ChannelListContainerStyle>
  );
}

export default ChannelListContainer;
