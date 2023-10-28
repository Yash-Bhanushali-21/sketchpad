import { useEffect } from "react";
import { socket } from "@/socket";

const useCanvasDrawing = ({
  canvasRef,
  drawHistory,
  historyPointer,
  shouldDraw,
}) => {
  const getCanvasAndContext = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      return { canvas, context };
    }
  };
  const beginPath = (x, y) => {
    const { canvas, context } = getCanvasAndContext();
    context.beginPath();
    context.moveTo(x, y);
  };

  const drawLine = (x, y) => {
    const { canvas, context } = getCanvasAndContext();
    context.lineTo(x, y);
    context.stroke();
  };

  const handleMouseDown = (e) => {
    // Handle mouse down
    shouldDraw.current = true;
    beginPath(
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY
    );
    socket.emit("beginPath", {
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    });
  };

  const handleMouseMove = (e) => {
    // Handle mouse move
    if (!shouldDraw.current) return;
    drawLine(
      e.clientX || e.touches[0].clientX,
      e.clientY || e.touches[0].clientY
    );
    socket.emit("drawLine", {
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    });
  };

  const handleMouseUp = (e) => {
    // Handle mouse up
    shouldDraw.current = false;
    const { canvas, context } = getCanvasAndContext();
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    drawHistory.current.push(imageData);
    historyPointer.current = drawHistory.current.length - 1;
  };

  const handleBeginPath = (path) => {
    // Handle begin path
    beginPath(path.x, path.y);
  };

  const handleDrawLine = (path) => {
    // Handle draw line
    drawLine(path.x, path.y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //event listener registrations
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleMouseDown);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchend", handleMouseUp);
    //socket events registerations
    socket.on("beginPath", handleBeginPath);
    socket.on("drawLine", handleDrawLine);
    return () => {
      // cleanup Remove event listeners and socket events
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUp);

      socket.off("beginPath", handleBeginPath);
      socket.off("drawLine", handleDrawLine);
    };
  }, [canvasRef, socket]);
};
export default useCanvasDrawing;
