import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaDoorOpen, FaBook } from "react-icons/fa";
import styled from "styled-components";
import { v1 as uuidv1 } from "uuid";

import { loginUser } from "../../actions/userActions";
import {
  subscribeSocket,
  cancelSocketSubscription,
  socket
} from "../../config/socketConfig";
import { postAuthToken } from "../../api/userApi";
import {
  INIT_ROOM_LIST,
  CREATE_ROOM
} from "../../constants/socketEvents";

import Loading from "../Loading/Loading";
import Background from "../publicComponents/Backgroud/Background";
import AlertModal from "../publicComponents/AlertModal/AlertModal";
import WelcomeHeader from "../publicComponents/WelcomeHeader/WelcomeHeader";
import InputWithLabel from "../publicComponents/InputWithLabel/InputWithLabel";
import ChannelListGuide from "../ChannelList/ChannelListGuide/ChannelListGuide";
import ChannelListContainer from "./ChannelListContainer/ChannelListContainer";

const ChannelListOutter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .channel-enterroominput {
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

  .guide {
    position: fixed;
    right: 1em;
    bottom: 1em;
    color: #ffffff;
    z-index: 11;
    cursor: pointer;
  }
`;

function ChannelList() {
  const [roomId, setRoomId] = useState("");
  const [enterRoomId, setEnterRoomId] = useState("");
  const [createRoomTitle, setCreateRoomTitle] = useState("");
  const [modalMessages, setModalMessages] = useState([]);
  const [isAuthuticate, setIsAuthuticate] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isShowGuide, setIsShowGuide] = useState(false);
  const currentUser = useSelector((state) => state.userReducer.user);
  const { activedRooms } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    subscribeSocket(dispatch);

    return () => cancelSocketSubscription();
  }, []);

  useEffect(() => {
    socket.emit(INIT_ROOM_LIST);
  }, []);

  useEffect(() => {
    const token = {
      accessToken: localStorage.getItem("access"),
      refreshToken: localStorage.getItem("refresh")
    };

    (async function checkUserInfo() {
      const response = await postAuthToken(token);

      if (response.message) return setIsAuthuticate(false);

      const { user } = response;

      dispatch(loginUser(user));
    })();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        setIsReady(true);
      }, 1000);
    }
  }, [currentUser]);

  function handleCreateRoomChange(event) {
    setCreateRoomTitle(event.target.value);
  }

  function handleEnterRoomIdChange(event) {
    setEnterRoomId(event.target.value);
  }

  function handleCreateRoomClick() {
    if (!createRoomTitle) {
      const alertMessage = "타이틀을 입력하셔야 합니다.";

      return setModalMessages([...modalMessages, alertMessage]);
    }

    const id = uuidv1();
    const roomInfo = {
      title: createRoomTitle,
      roomId: id
    };

    setRoomId(id);
    socket.emit(CREATE_ROOM, currentUser, roomInfo);
  }

  function handleEnterRoomClick() {
    if (!enterRoomId) {
      const alertMessage = "방 주소를 입력하셔아합니다.";

      return setModalMessages([...modalMessages, alertMessage]);
    }

    const isExistRoom = activedRooms.some((activedRoom) => {
      return activedRoom[0] === enterRoomId;
    });

    if (!isExistRoom) {
      const alertMessage = "존재하지 않는 방입니다.";

      return setModalMessages([...modalMessages, alertMessage]);
    }

    setRoomId(enterRoomId);
  }

  function handleGuideClick() {
    setIsShowGuide((isShowGuide) => !isShowGuide);
  }

  if (!isAuthuticate) return (
    <Redirect
      to={{
        pathname: "/error",
        state: { message: "Token has Expired!" }
      }}
    />
  );

  if (roomId) return (
    <Redirect
      to={{
        pathname: `/main/${roomId}`,
        state: { authRouting: true }
      }}
    />
  );

  if (!isReady) return (
    <Background>
      <Loading />
    </Background>
  );

  return (
    <Background>
      <ChannelListOutter>
        <WelcomeHeader currentUser={currentUser} />
        <div className="channel-enterroominput">
          <InputWithLabel
            width="40%"
            height="60%"
            labelContent="Enter room"
            placeholder="room Id"
            onChange={handleEnterRoomIdChange}
            value={enterRoomId}
            type="text"
          />
          <FaDoorOpen
            size={40}
            onClick={handleEnterRoomClick}
            cursor="pointer"
          />
          <InputWithLabel
            width="40%"
            height="60%"
            labelContent="Create room"
            placeholder="room title"
            onChange={handleCreateRoomChange}
            value={createRoomTitle}
            type="text"
          />
          <FaDoorOpen
            size={40}
            onClick={handleCreateRoomClick}
            cursor="pointer"
          />
        </div>
        <ChannelListContainer
          activedRooms={activedRooms}
          setRoomId={setRoomId}
        />
        {0 < modalMessages.length &&
          <AlertModal
            handleAlertDelete={setModalMessages}
            alertMessages={modalMessages}
          />
        }
        <FaBook
          size={40}
          className="guide"
          onClick={handleGuideClick}
        />
        {isShowGuide && <ChannelListGuide />}
      </ChannelListOutter>
    </Background>
  );
}

export default ChannelList;
