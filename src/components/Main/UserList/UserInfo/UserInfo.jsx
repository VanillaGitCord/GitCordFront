import React from "react";
import { FaCrown, FaMicrophoneSlash } from "react-icons/fa";
import { SiDeno } from "react-icons/si";
import styled from "styled-components";

const UserInfoContainer = styled.article`
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
`;

function UserInfo({ participant }) {
  const { name, isOwner, isStreaming } = participant;

  return (
    <UserInfoContainer>
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
    </UserInfoContainer>
  );
}

export default React.memo(UserInfo);
