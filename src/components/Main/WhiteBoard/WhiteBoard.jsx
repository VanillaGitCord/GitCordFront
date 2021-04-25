import React, {
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";

const WhiteBoardCanvas = styled.div`
  position: relative;
  width: 59%;
  height: 80%;
  margin: 1em;
  background-color: #FFFFFF;
  border-radius: 10px;

  .colorpicker {
    position: absolute;
    top: -10px;
    left: 50%;
  }
`;

function WhiteBoard({ socket, roomId }) {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [color, setColor] = useState("#000000");
  const canvasRef = useRef();
  const canvasouter = useRef();

  let pos = {
    drawable: false,
    X: -1,
    Y: -1,
    color
  };

  useEffect(() => {
    if (!canvasRef || !canvasouter) return;

    setWidth(canvasouter.current.offsetWidth);
    setHeight(canvasouter.current.offsetHeight);

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", initDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", finishDraw);
    canvas.addEventListener("mouseout", finishDraw);

    function initDraw(event) {
      pos = { drawable: true, color, ...getPosition(event) };

      socket.emit("send draw Start", roomId, pos);
    }

    function draw(event) {
      if (pos.drawable) {
        pos = { drawable: pos.drawable, color, ...getPosition(event) };

        socket.emit("sendDraw", roomId, pos);
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

    socket.on("drawStart", (receivedPos) => {
      console.log(ctx);
      setColor(receivedPos.color);
      ctx.moveTo(receivedPos.X, receivedPos.Y);
      ctx.strokeStyle = receivedPos.color;
      ctx.lineWidth = 2.5;
    });

    socket.on("drawing", (receivedPos) => {
      ctx.lineTo(receivedPos.X, receivedPos.Y);
      ctx.stroke();
    });

    socket.on("clearCanvas", () => {
      console.log("clearCanvas");
      ctx.clearRect(0,0,width,height);
      ctx.beginPath();
    });

    return () => {
      socket.off("drawStart");
      socket.off("drawing");
      socket.off("clearCanvas");
    }
  }, [canvasRef, canvasouter, roomId, color]);

  function handleColorChange(e) {
    setColor(e.target.value);
  }

  function handleButtonClick(e) {
    console.log("asdfasdf");
    socket.emit("deleteCanvas", roomId);
  }

  return (
    <WhiteBoardCanvas ref={canvasouter}>
      <input type="color" className="colorpicker" value={color} onChange={handleColorChange} />
      <button onClick={handleButtonClick} />
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
