import React from "react";
import styled from "styled-components";

const ColorPickerContainer = styled.div`
  .colorpicker-container-down {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    transform: translateY(50%);
  }

  .colorpicker-text {
    font-size: 20px;
    font-weight: bold;
  }

  .colorpicker {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    transition: all .5s ease;

    &:hover {
      box-shadow: 0px 0px 0px 7px rgba(121, 119, 119, 0.6);
    }

    &-input {
      width: 100px;
      height: 100px;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  }
`;

function ColorPicker({
  color,
  colorPickerClickEvent,
  className
}) {
  return (
    <ColorPickerContainer className={className}>
      <div className="colorpicker-container-down">
        <span className="colorpicker-text">색 선택</span>
        <div className="colorpicker">
          <input type="color"
            className="colorpicker-input"
            value={color}
            onChange={colorPickerClickEvent}
          />
        </div>
      </div>
    </ColorPickerContainer>
  );
}

export default React.memo(ColorPicker);
