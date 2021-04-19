import React from "react";
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
  roomInfo
}) {
  const { joinUsers } = roomInfo;

  function renderJoinUsers() {
    return joinUsers.map((joinUser) => (
      <div key={joinUser}>
        {joinUser}
      </div>
    ));
  }

  return (
    <UserListContainer>
      <article className="userlist-title">
        Users
      </article>
      <article className="userlist-participants">
        {renderJoinUsers()}
      </article>
      <UserToolbar />
    </UserListContainer>
  );
}

export default UserList;
