import React from "react";
import { FaCrown } from "react-icons/fa";
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
  setAlertMessages
}) {

  function renderJoinUsers() {
    return userList.map((participant) => {
      const { email, isOwner } = participant;

      return (
        <div key={email}>
          {isOwner && <FaCrown />} {email}
        </div>
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
        user={currentUser}
        alertMessages={alertMessages}
        setAlertMessages={setAlertMessages}
      />
    </UserListContainer>
  );
}

export default React.memo(UserList);
