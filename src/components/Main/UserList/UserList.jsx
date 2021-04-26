import React from "react";
import { FaCrown, FaMicrophoneSlash } from "react-icons/fa";
import { SiDeno } from "react-icons/si";
import styled from "styled-components";

import UserToolbar from "./UserToolbar/UserToolbar";

const UserListContainer = styled.div`
  width: 18%;
  height: 80%;
  margin: 1em;
  background-color: #ffffff;
  border: 2px solid #C9D3DD;
  border-radius: 10px;
  text-align: center;
  overflow-y: scroll;

  .join-user {
    display: flex;
    align-items: center;
    margin: 0.7em;

    .crown-area {
      position: left;
      width: 10%;
      height: 100%;
      margin-right: 1em;
    }

    .user-area {
      display: flex;
      align-items: center;
      width: 80%;
      height: 100%;
    }

    span {
      display: inline-block;
      max-width: 10em;
      margin-left: 0.5em;
      word-break: break-all;
      text-align: left;
    }

    .streaming-status {
      position: right;
      width: 10%;
      height: 100%;
    }
  }

  .userlist-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 10%;
    line-height: 10%;
    margin: 0.5em;
    margin-left: 0.6em;
    border-bottom: 2px solid #C9D3DD;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .userlist-participants {
    width: 100%;
    height: 76.5%;
  }
`;

function UserList({
  currentUser,
  userList,
  alertMessages,
  setAlertMessages,
  socket,
  roomId,
  isVideoStopped,
  videoToggle
}) {
  function renderJoinUsers() {
    return userList.map((participant) => {
      const { email, name, isOwner, isStreaming } = participant;

      return (
        <article key={email} className="join-user">
          <div className="crown-area">
            {isOwner &&
              <FaCrown color="gold" size={20} />
            }
          </div>
          <div className="user-area">
            <div>
              <SiDeno size={30} />
            </div>
            <div>
              <span>{name}</span>
            </div>
          </div>
          <div class="streaming-status">
            { isStreaming || <FaMicrophoneSlash /> }
          </div>
        </article>
      );
    });
  }

  return (
    <UserListContainer>
      <article className="userlist-title">
        Users
      </article>
      <article className="userlist-participants">
        {renderJoinUsers()}
      </article>
      <UserToolbar
        roomId={roomId}
        user={currentUser}
        alertMessages={alertMessages}
        setAlertMessages={setAlertMessages}
        socket={socket}
        isVideoStopped={isVideoStopped}
        videoToggle={videoToggle}
      />
    </UserListContainer>
  );
}

export default React.memo(UserList);
