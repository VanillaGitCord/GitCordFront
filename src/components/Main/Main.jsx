import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";

import {
  subscribeSocket,
  cancelSocketSubscription,
  socket
} from "../../config/socketConfig";
import { addUser } from "../../actions/userActions";
import { postAuthToken } from "../../api/userApi";

import MainNavbar from "./MainNavbar/MainNavbar";
import UserList from "./UserList/UserList";
import CodeEditor from "./CodeEditor/CodeEditor";
import Chat from "./Chat/Chat";
import CamWindow from "./CamWindow/CamWindow";

const MainOuter = styled.div`
  width: 100%;
  height: 100%;
  background-color: #F3F6FB;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`;

function Main() {
  const [isAuthuticate, setIsAuthuticate] = useState(true);
  const roomInfo = useSelector((state) => state.roomReducer);
  const currentUser = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = {
      accessToken: localStorage.getItem("access"),
      refreshToken: localStorage.getItem("refresh")
    };

    (async function checkUserInfo() {
      const response = await postAuthToken(token);
      const {
        user,
        message
      } = response;

      if (message) return setIsAuthuticate(false);

      dispatch(addUser(user));
    })();
  }, []);

  useEffect(() => {
    socket.emit("init", currentUser, roomInfo);

    return () => socket.emit("bye", currentUser.email, roomInfo.roomId);
  }, []);

  useEffect(() => {
    subscribeSocket(dispatch);

    return () => cancelSocketSubscription();
  }, []);

  if (!isAuthuticate) return <Redirect to="/login" />;
  if (!roomInfo.roomId) return <Redirect to="/" />;

  return (
    <MainOuter>
      <MainNavbar
        currentUser={currentUser}
        roomInfo={roomInfo}
        socket={socket}
      />
      <MainContainer>
        <UserList
          currentUser={currentUser}
          roomInfo={roomInfo}
        />
        <CodeEditor
          socket={socket}
          roomInfo={roomInfo}
        />
        <Chat
          currentUser={currentUser}
          roomInfo={roomInfo}
          socket={socket}
        />
        <CamWindow />
      </MainContainer>
    </MainOuter>
  );
}

export default Main;
