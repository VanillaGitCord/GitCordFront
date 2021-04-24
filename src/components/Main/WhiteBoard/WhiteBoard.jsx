import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const WhiteBoardCanvas = styled.div`
  position: relative;
  width: 59%;
  height: 80%;
  margin: 1em;
  background-color: #FFFFFF;
  border-radius: 10px;
`;

function WhiteBoard({ socket, roomId }) {
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

      socket.emit("send draw Start", roomId, pos);
    }

    function draw(event) {
      if (pos.drawable) {
        pos = { drawable: pos.drawable, ...getPosition(event) };

        socket.emit("sendDraw", roomId, pos);
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

    socket.on("drawStart", (receivedPos) => {
      ctx.moveTo(receivedPos.X, receivedPos.Y);
      ctx.strokeStyle = "#211eeb";
      ctx.lineWidth = 2.5;
    });

    socket.on("drawing", (receivedPos) => {
      ctx.lineTo(receivedPos.X, receivedPos.Y);
      ctx.stroke();
    });
  }, [canvasRef, canvasouter, roomId]);

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
