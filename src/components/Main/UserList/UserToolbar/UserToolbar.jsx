import React from "react";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillSave
} from "react-icons/ai";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi";
import styled from "styled-components";

const UserToolbarContainer = styled.div`
  width: 100%;
  height: 10%;
  bottom: 0;
  border-radius: 10px;
  background-color: #FFEEF4;
`;

function UserToolbar() {
  return (
    <UserToolbarContainer>
      username
      <article>
        <GiSpeaker />
        <BsFillMicFill />
        <AiFillCaretLeft />
        <AiFillCaretRight />
        <AiFillSave />
      </article>
    </UserToolbarContainer>
  );
}

export default UserToolbar;
