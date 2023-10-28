import { useEffect } from "react";
import { socket } from "@/socket";

const useCanvasConfigChange = ({ canvasRef, color, size }) => {
  const changeConfig = (context, color, size) => {
    context.strokeStyle = color;
    context.lineWidth = size;
  };
  const handleChangeConfig = (config) => {
    const context = canvasRef.current.getContext("2d");
    changeConfig(context, config.color, config.size);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    //for the local changes.
    handleChangeConfig({ color, size });
    //for the socket responding to a change.
    socket.on("changeConfig", handleChangeConfig);

    return () => {
      socket.off("changeConfig", handleChangeConfig);
    };
  }, [color, size]);
};
export default useCanvasConfigChange;
