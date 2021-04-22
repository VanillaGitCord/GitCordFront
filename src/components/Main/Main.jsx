import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import styled from "styled-components";

import {
  subscribeSocket,
  cancelSocketSubscription,
  socket
} from "../../config/socketConfig";
import { leaveRoom } from "../../actions/roomActions";
import { loginUser } from "../../actions/userActions";
import { postAuthToken } from "../../api/userApi";

import MainNavbar from "./MainNavbar/MainNavbar";
import UserList from "./UserList/UserList";
import CodeEditor from "./CodeEditor/CodeEditor";
import Chat from "./Chat/Chat";
import CamWindow from "./CamWindow/CamWindow";
import Background from "../publicComponents/Backgroud/Background";
import Loading from "../Loading/Loading";
import AlertModal from "../publicComponents/AlertModal/AlertModal";

const MainOuter = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
`;

function Main({ location }) {
  const [isAuthuticate, setIsAuthuticate] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [modalMessages, setModalMessages] = useState([]);
  const {
    title,
    participants,
    contents,
    chatLogs,
    typingUsers,
    isClosed
  } = useSelector((state) => state.roomReducer);
  const currentUser = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const authRouting = location.state && location.state.authRouting;

  useEffect(() => {
    socket.emit("join", currentUser, roomId, true);

    return () => {
      socket.emit("bye", currentUser.email, roomId);
      dispatch(leaveRoom());
    };
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
    subscribeSocket(dispatch);

    return () => cancelSocketSubscription();
  }, []);

  useEffect(() => {
    if (currentUser.email) {
      setTimeout(() => {
        setIsReady(true);
      }, 4000);
    }
  }, [currentUser]);

  function handleCopyButtonClick() {
    const alertMessage = "클립보드에 복사되었습니다."

    setModalMessages([...modalMessages, alertMessage]);
  }

  if (!authRouting) return (
    <Redirect
      to={{
        pathname: "/error",
        state: { message: "정상적인 접근 방법이 아닙니다!" }
      }}
    />
  );

  if (!isAuthuticate) return (
    <Redirect
      to={{
        pathname: "/error",
        state: { message: "Token has Expired!" }
      }}
    />
  );

  if (isClosed) return <Redirect to="/" />;

  if (!isReady) return (
    <Background>
      <Loading />
    </Background>
  );

  return (
    <Background>
      <MainOuter>
        <MainNavbar
          currentUser={currentUser}
          roomTitle={title}
          roomId={roomId}
          handleCopyButtonClick={handleCopyButtonClick}
        />
        <MainContainer>
          <UserList
            currentUser={currentUser}
            userList={participants}
          />
          <CodeEditor
            currentUser={currentUser}
            typingUsers={typingUsers}
            socket={socket}
            roomId={roomId}
            contents={contents}
          />
          <Chat
            currentUser={currentUser}
            chatLogs={chatLogs}
            roomId={roomId}
            socket={socket}
          />
          <CamWindow
            currentUser={currentUser}
            participants={participants}
          />
          {0 < modalMessages.length &&
            <AlertModal
              handleAlertDelete={setModalMessages}
              alertMessages={modalMessages}
            />
          }
        </MainContainer>
      </MainOuter>
    </Background>
  );
}

export default Main;
