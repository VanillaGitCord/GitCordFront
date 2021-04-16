import React from "react";
import styled from "styled-components";

const InputWithLabelStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};

  .inputLabel {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 4px;
    color: white;
    font-weight: 700;
  }

  .textInput {
    width: 97%;
    height: 35px;
    border: 3px solid #C9D3DD;
    border-radius: 5px;
  }
`;

function InputWithLabel({
  width = "100%",
  height = "100%",
  labelContent,
  placeholder,
  onChange
}) {
  return (
    <InputWithLabelStyle width={width} height={height}>
      <label className="inputLabel">{labelContent}</label>
      <input
        type="text"
        className="textInput"
        placeholder={placeholder}
        onChange={onChange}
      />
    </InputWithLabelStyle>
  );
}

export default InputWithLabel;
