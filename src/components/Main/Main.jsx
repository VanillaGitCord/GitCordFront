import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
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
  const {
    title,
    owner,
    participants,
    contents,
    chatLogs,
    isError
  } = useSelector((state) => state.roomReducer);
  const currentUser = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    // 초기 데이터 요청
    socket.emit("join", currentUser, roomId);

    return () => socket.emit("bye", currentUser.email, roomId);
  }, []);

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
    subscribeSocket(dispatch);

    return () => cancelSocketSubscription();
  }, []);

  return (
    <MainOuter>
      <MainNavbar
        currentUser={currentUser}
        roomTitle={title}
        roomId={roomId}
        socket={socket}
      />
      <MainContainer>
        <UserList
          currentUser={currentUser}
          userList={participants}
        />
        <CodeEditor
          socket={socket}
          roomId={roomId}
          contents={contents}
        />
        <Chat
          currentUser={currentUser}
          roomId={roomId}
          chatLogs={chatLogs}
          socket={socket}
        />
        <CamWindow />
      </MainContainer>
    </MainOuter>
  );
}

export default Main;
