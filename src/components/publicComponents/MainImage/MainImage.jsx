import React from 'react';
import styled from 'styled-components';

import mainImage from "../../../assets/images/mainIcon.png";

const MainIconWrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  opacity: 1;

  img {
    width: 100%;
    height: 100%;
  }
`;

const MainIcon = ({ width, height }) => {
  return (
    <MainIconWrapper width={width} height={height}>
      <img src={mainImage} alt="icon" />
    </MainIconWrapper>
  );
}

export default MainIcon;
