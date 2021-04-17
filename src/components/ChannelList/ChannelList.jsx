import React from "react";
import { FaDoorOpen } from "react-icons/fa";
import styled from "styled-components";

import Background from "../publicComponents/Backgroud/Background";
import WelcomeHeader from "../publicComponents/WelcomeHeader/WelcomeHeader";
import InputWithLabel from "../publicComponents/InputWithLabel/InputWithLabel";
import ChannelListContainer from "./ChannelListContainer/ChannelListContainer";

const ChannelListOutter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .channlelist-enterroominput {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    height: 15%;

    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60%;
      cursor: pointer;
    }
  }
`;

function ChannelList() {
  return (
    <Background>
      <ChannelListOutter>
        <WelcomeHeader />
        <div className="channlelist-enterroominput">
          <InputWithLabel
            labelContent="Enter room"
            placeholder="room ID..."
            width= "80%"
            height="60%"
          />
          <div className="channlelist-enterroominput-icon">
            <FaDoorOpen size={60} />
          </div>
        </div>
        <ChannelListContainer />
      </ChannelListOutter>
    </Background>
  );
}

export default ChannelList;
