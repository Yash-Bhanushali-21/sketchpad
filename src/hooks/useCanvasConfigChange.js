import { useEffect } from "react";
import { socket } from "@/socket";

const useCanvasConfigChange = ({ canvasRef, color, size }) => {
  const changeConfig = (context, color, size) => {
    context.strokeStyle = color;
    context.lineWidth = size;
  };
  const handleChangeConfig = (config) => {
    changeConfig(config.color, config.size);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    changeConfig(context, color, size);
    socket.on("changeConfig", handleChangeConfig);

    return () => {
      socket.off("changeConfig", handleChangeConfig);
    };
  }, [color, size]);
};
export default useCanvasConfigChange;
