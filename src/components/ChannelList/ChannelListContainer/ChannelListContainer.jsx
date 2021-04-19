import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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

function ChannelListContainer({ socket }) {
  const { activedRooms } = useSelector((state) => state.roomReducer);

  useEffect(() => {
    socket.emit("init roomList");
  }, []);

  function renderActivedRooms() {
    const activedRoomList = [];

    for (const activedRoom in activedRooms) {
      activedRoomList.push({
        roomId: activedRoom,
        roomInfo: activedRooms[activedRoom]
      });
    }

    return activedRoomList.map((activedRoom) => {
      return <Channel activeRoomInfo={activedRoom} />
    });
  }

  return (
    <ChannelListContainerStyle>
      {renderActivedRooms()}
    </ChannelListContainerStyle>
  );
}

export default ChannelListContainer;
