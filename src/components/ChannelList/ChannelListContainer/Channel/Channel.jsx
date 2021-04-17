import React from "react";
import styled from "styled-components";

const ChannelStyle = styled.div`
  width: 90%;
  height: 15%;
  background-color: white;
  margin-bottom: 20px;
  border: 3px solid #C9D3DD;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

function Channel() {
  return (
    <ChannelStyle>
      channelContents...
    </ChannelStyle>
  );
}

export default Channel;
