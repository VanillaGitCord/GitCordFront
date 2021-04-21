import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaDoorOpen } from "react-icons/fa";
import styled from "styled-components";
import { v1 as uuidv1 } from "uuid";

import { addUser } from "../../actions/userActions";
import {
  subscribeSocket,
  cancelSocketSubscription,
  socket
} from "../../config/socketConfig";
import { postAuthToken } from "../../api/userApi";

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
  const [roomId, setRoomId] = useState("");
  const [isAuthuticate, setIsAuthuticate] = useState(true);
  const currentUser = useSelector((state) => state.userReducer.user);
  const { activedRooms } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("init roomList");
  }, []);

  useEffect(() => {
    const token = {
      accessToken: localStorage.getItem("access"),
      refreshToken: localStorage.getItem("refresh")
    };

    (async function checkUserInfo() {
      const response = await postAuthToken(token);

      if (response.message) return setIsAuthuticate(false);

      const {
        user: { name, email }
      } = response;

      dispatch(addUser({ name, email }));
    })();
  }, []);

  useEffect(() => {
    subscribeSocket(dispatch);

    return () => cancelSocketSubscription();
  }, []);

  if (!isAuthuticate) return <Redirect to="/login" />;
  if (roomId) return <Redirect to={`/main/${roomId}`} />;

  function handleCreateRoomChange(event) {
    setCreateRoomTitle(event.target.value);
  }

  function handleEnterRoomIdChange(event) {
    setEnterRoomId(event.target.value);
  }

  async function handleCreateRoomClick() {
    const id = uuidv1();

    setRoomId(id);

    const roomInfo = {
      title: createRoomTitle,
      roomId: id
    };

    socket.emit("create room", currentUser, roomInfo);
  }

  function handleEnterRoomClick() {
    setRoomId(enterRoomId);
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
          <div
            className="channlelist-enterroominput-icon"
            onClick={handleEnterRoomClick}
          >
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
        <ChannelListContainer
          activedRooms={activedRooms}
          setRoomId={setRoomId}
        />
      </ChannelListOutter>
    </Background>
  );
}

export default ChannelList;
