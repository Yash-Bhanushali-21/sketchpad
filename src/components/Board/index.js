import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Board = () => {
  const canvasRef = useRef(null);
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  useEffect(() => {
    if (canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = wndow.innerHeight;
  }, []);

  return <canvas ref={canvasRef} />;
};
export default Board;
