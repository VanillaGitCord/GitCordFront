import React from 'react';
import styled from 'styled-components';

import mainImage from "../../../assets/images/mainIcon.png";

const MainIconWrapper = styled.div`
  display: inline-block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0.5em;

  img {
    width: 100%;
    height: 100%;
  }
`;

function MainIcon({ width, height }) {
  return (
    <MainIconWrapper width={width} height={height}>
      <img src={mainImage} alt="icon" />
    </MainIconWrapper>
  );
}

export default MainIcon;
