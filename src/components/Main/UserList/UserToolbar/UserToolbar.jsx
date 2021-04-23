import React from "react";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillSave
} from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { GiSpeaker } from "react-icons/gi";
import styled from "styled-components";

const UserToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 10%;
  background-color: #FFEEF4;
  bottom: 0;
  border-radius: 10px;
  font-weight: bold;

  .toolbar-icon {
    margin: 10px;
  }
`;

function UserToolbar({ user }) {
  return (
    <UserToolbarContainer>
      {user.name}
      <article>
        <GiSpeaker size={25} className="toolbar-icon" />
        <BsFillMicFill size={25} className="toolbar-icon" />
        <AiFillCaretLeft size={25} className="toolbar-icon" />
        <AiFillCaretRight size={25} className="toolbar-icon" />
        <AiFillSave size={25} className="toolbar-icon" />
      </article>
    </UserToolbarContainer>
  );
}

export default UserToolbar;
