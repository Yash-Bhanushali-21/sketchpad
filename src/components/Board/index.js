import { useRef, useEffect } from "react";

const Board = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = wndow.innerHeight;
  }, []);

  return <canvas ref={canvasRef} />;
};
export default Board;
