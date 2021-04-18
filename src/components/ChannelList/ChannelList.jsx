import React, { useState } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaDoorOpen } from "react-icons/fa";
import styled from "styled-components";

import { createRoom } from "../../actions/roomActions";

import Background from "../publicComponents/Backgroud/Background";
import WelcomeHeader from "../publicComponents/WelcomeHeader/WelcomeHeader";
import InputWithLabel from "../publicComponents/InputWithLabel/InputWithLabel";
import ChannelListContainer from "./ChannelListContainer/ChannelListContainer";

const ChannelListOutter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .channlelist-enterroominput {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    height: 15%;

    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60%;
      cursor: pointer;
    }
  }
`;

function ChannelList() {
  const [enterRoomId, setEnterRoomId] = useState("");
  const [createRoomTitle, setCreateRoomTitle] = useState("");
  const dispatch = useDispatch();
  const { roomId, isError } = useSelector((state) => state.roomReducer);
  const currentUser = useSelector((state) => state.userReducer.user);

  if (isError) return <Redirect to="/error" />
  if (!currentUser.email) return <Redirect to="/login" />
  if (roomId) return <Redirect to="/main" />

  function handleCreateRoomChange(event) {
    setCreateRoomTitle(event.target.value);
  }

  function handleEnterRoomIdChange(event) {
    setEnterRoomId(event.target.value);
  }

  async function handleCreateRoomClick() {
    const payload = {
      accessToken: localStorage.getItem("access"),
      refreshToken: localStorage.getItem("refresh"),
      roomTitle: createRoomTitle
    };

    dispatch(createRoom(payload));
  }

  return (
    <Background>
      <ChannelListOutter>
        <WelcomeHeader />
        <div className="channlelist-enterroominput">
          <InputWithLabel
            width="40%"
            height="60%"
            labelContent="Enter room"
            placeholder="room Id"
            onChange={handleEnterRoomIdChange}
            value={enterRoomId}
            type="text"
          />
          <div className="channlelist-enterroominput-icon">
            <FaDoorOpen size={50} />
          </div>
          <InputWithLabel
            width="40%"
            height="60%"
            labelContent="Create room"
            placeholder="room title"
            onChange={handleCreateRoomChange}
            value={createRoomTitle}
            type="text"
          />
          <div
            className="channlelist-enterroominput-icon"
            onClick={handleCreateRoomClick}
          >
            <FaDoorOpen size={50} />
          </div>
        </div>
        <ChannelListContainer />
      </ChannelListOutter>
    </Background>
  );
}

export default ChannelList;
