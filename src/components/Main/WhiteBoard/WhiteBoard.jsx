import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const WhiteBoardCanvas = styled.div`
  position: relative;
  width: 59%;
  height: 80%;
  margin: 1em;
  background-color: #FFFFFF;
  border-radius: 10px;
`;

function WhiteBoard() {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const canvasRef = useRef();
  const canvasouter = useRef();

  let pos = {
    drawable: false,
    X: -1,
    Y: -1
  };

  useEffect(() => {
    console.log(canvasRef)

    if (!canvasRef || !canvasouter) return;

    setWidth(canvasouter.current.offsetWidth);
    setHeight(canvasouter.current.offsetHeight);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = "#211eeb";
      ctx.lineWidth = 2.5;
    }
    canvas.addEventListener("mousedown", initDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", finishDraw);
    canvas.addEventListener("mouseout", finishDraw);

    function initDraw(event) {
      pos = {drawable: true, ...getPosition(event)};
      ctx.moveTo(pos.X, pos.Y);
    }

    function draw(event) {
      if (pos.drawable) {
        pos = { drawable: pos.drawable, ...getPosition(event) };
        ctx.lineTo(pos.X, pos.Y);
        ctx.stroke();
      }
    }

    function finishDraw() {
      pos = {drawable: false, X: -1, Y: -1};
    }

    function getPosition(event) {
      return {
        X: event.offsetX,
        Y: event.offsetY
      }
    }
  }, [canvasRef, canvasouter]);

  // 캔바스 그 자체를 보내기


  return (
    <WhiteBoardCanvas ref={canvasouter}>
      <canvas
        ref={canvasRef}
        className="whiteboard-canvas"
        width={width}
        height={height}
      ></canvas>
    </WhiteBoardCanvas>
  );
}

export default WhiteBoard;
