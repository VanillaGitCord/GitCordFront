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

  .user-list-title {
    width: 100%;
    height: 10%;
    border-bottom: 1px solid #C9D3DD;
  }

  .user-list {
    width: 100%;
    height: 80%;
  }
`;

function UserList() {
  return (
    <UserListContainer>
      <article className="user-list-title">
        Users
      </article>
      <article className="user-list">
        User List
      </article>
      <UserToolbar />
    </UserListContainer>
  );
}

export default UserList;
