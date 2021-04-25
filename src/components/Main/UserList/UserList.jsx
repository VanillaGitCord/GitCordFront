import React from "react";
import { FaCrown } from "react-icons/fa";
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
    margin: 1em;

    .crown-area {
      width: 10%;
      height: 100%;
      margin-right: 1em;
    }

    span {
      display: inline-block;
      max-width: 10em;
      margin-left: 0.5em;
      word-break: break-all;
      text-align: left;
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
  roomId
}) {

  function renderJoinUsers() {
    return userList.map((participant) => {
      const { email, isOwner } = participant;

      return (
        <article key={email} className="join-user">
          <div className="crown-area">
            {isOwner &&
              <FaCrown color="gold" size={20} />
            }
          </div>
          <SiDeno size={30} />
          <span>{email}</span>
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
      />
    </UserListContainer>
  );
}

export default React.memo(UserList);
