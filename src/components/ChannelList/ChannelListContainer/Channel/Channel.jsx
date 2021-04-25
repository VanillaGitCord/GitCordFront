import React from "react";
import { GiMushroomHouse } from "react-icons/gi";
import styled from "styled-components";

import mainIcon from "../../../../assets/images/mainIcon.png";

const ChannelStyle = styled.div`
  position: relative;
  width: 90%;
  height: 15%;
  margin: 0.5em;
  border: 1px solid #C9D3DD;
  border-radius: 8px;
  background-color: #ffffff;
  background-image: url(${(props) => props.mainIcon});
  background-size: 300px;
  cursor: pointer;
  color: #000000;

  .left {
    display: block;
    width: 50%;
    height: 100%;
  }

  .channel-icon {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: gold;
    border: 3px solid #ffffff;
    border-radius: 50%;
  }

  .channel-info {
    display: block;
    width: 50%;
    height: 100%;
    background-color: gold;
    border-radius: 8px;
  }

  &:hover {
    opacity: 0.8;
  }

  span {
    padding: 1em;
    font-weight: bold;
    line-height: 2em;
  }
`;

function Channel({ roomInfo, onClick }) {
  const { roomTitle, owner } = roomInfo;

  return (
    <ChannelStyle onClick={onClick} mainIcon={mainIcon} >
      <div className="left">
        background
      </div>
      <GiMushroomHouse className="channel-icon" size={30} />
      <div className="channel-info">
        <span>title: {roomTitle}</span>
        <br />
        <span>owner: {owner.email}</span>
        <button className="enter-button">입장하기</button>
      </div>
    </ChannelStyle>
  );
}

export default Channel;
