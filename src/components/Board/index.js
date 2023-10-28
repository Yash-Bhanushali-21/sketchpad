import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useCanvasConfigChange,
  useCanvasDrawing,
  useMenuItemAction,
} from "@/hooks";

const Board = () => {
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);
  const dispatch = useDispatch();
  //custom refs
  const canvasRef = useRef(null);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const shouldDraw = useRef(false);

  useCanvasDrawing({ canvasRef, drawHistory, historyPointer, shouldDraw });
  useCanvasConfigChange({ canvasRef, color, size });
  useMenuItemAction({ canvasRef, actionMenuItem, dispatch });

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
