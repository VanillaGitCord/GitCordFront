import React, {
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import { throttle } from "lodash";

import {
  SEND_DRAW,
  SEND_DRAW_START,
  CHANGE_COLOR,
  DELETE_CANVAS,
  RECEIVE_COLOR,
  DRAWING,
  DRAW_START,
  CLEAR_CANVAS
} from "../../../constants/socketEvents";

const WhiteBoardCanvas = styled.div`
  position: relative;
  width: 59%;
  height: 80%;
  margin: 1em;
  background-color: #FFFFFF;
  border-radius: 10px;

  .colorpicker-container {
    position: absolute;
    left: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    transform: translateX(-50%);

    &-up {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 100%;
      transform: translateY(-100%);
    }

    &-down {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 100%;
      transform: translateY(50%);
    }
  }

  .clearbutton {
    width: 50px;
    height: 30px;
    border-radius: 13%;
    border: solid 0px;
    cursor: pointer;
    background-color: #5C377F;
    font-weight: bold;
    color: #FFFFFF;
    transition: all .5s ease;

    &:hover {
      box-shadow: 0px 0px 0px 7px rgba(92, 55, 127, 0.6);
    }
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

function WhiteBoard({ socket, roomId }) {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef();
  const canvasouter = useRef();

  let pos = {
    drawable: false,
    X: -1,
    Y: -1
  };

  useEffect(() => {
    if (!canvasRef || !canvasouter) return;

    setWidth(canvasouter.current.offsetWidth);
    setHeight(canvasouter.current.offsetHeight);

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 2.5;

    canvas.addEventListener("mousedown", initDraw);
    canvas.addEventListener("mousemove", throttle(draw, 50));
    canvas.addEventListener("mouseup", finishDraw);
    canvas.addEventListener("mouseout", finishDraw);

    function initDraw(event) {
      pos = { drawable: true, ...getPosition(event) };

      socket.emit(SEND_DRAW_START, roomId, pos);
    }

    function draw(event) {
      if (pos.drawable) {
        pos = { drawable: pos.drawable, ...getPosition(event) };

        socket.emit(SEND_DRAW, roomId, pos);
      }
    }

    function finishDraw() {
      pos = {
        drawable: false,
        X: -1,
        Y: -1
      };
    }

    function getPosition(event) {
      return {
        X: event.offsetX,
        Y: event.offsetY
      }
    }

    socket.on(RECEIVE_COLOR, (color) => {
      setColor(color);
      ctx.strokeStyle = color;
    });

    socket.on(DRAW_START, (receivedPos) => {
      isDrawing || setIsDrawing(true);
      ctx.moveTo(receivedPos.X, receivedPos.Y);
    });

    socket.on(DRAWING, (receivedPos) => {
      ctx.lineTo(receivedPos.X, receivedPos.Y);
      ctx.stroke();
    });

    socket.on(CLEAR_CANVAS, () => {
      setIsDrawing(false);
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
    });

    return () => {
      socket.off(DRAW_START);
      socket.off(DRAWING);
      socket.off(CLEAR_CANVAS);
      socket.off(RECEIVE_COLOR);
    };
  }, [canvasRef, canvasouter, roomId, color, isDrawing]);

  function handleColorChange(e) {
    socket.emit(CHANGE_COLOR, roomId, e.target.value);
  }

  function handleButtonClick() {
    socket.emit(DELETE_CANVAS, roomId);
  }

  function getColorpickerOrClearButton() {
    if (isDrawing) {
      return (
        <div className="colorpicker-container">
          <div className="colorpicker-container-up">
            <button className="clearbutton" onClick={handleButtonClick}>
              Clear!
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="colorpicker-container">
        <div className="colorpicker-container-down">
          <span className="colorpicker-text">색 선택</span>
          <div className="colorpicker">
            <input type="color"
              className="colorpicker-input"
              value={color}
              onChange={handleColorChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <WhiteBoardCanvas ref={canvasouter}>
      {
        getColorpickerOrClearButton()
      }
      <canvas
        ref={canvasRef}
        className="whiteboard-canvas"
        width={width}
        height={height}
      />
    </WhiteBoardCanvas>
  );
}

export default WhiteBoard;
