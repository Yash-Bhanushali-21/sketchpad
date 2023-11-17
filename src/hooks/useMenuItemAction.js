import { useEffect } from "react";
import { actionItemClick } from "@/slice/menuSlice";
import { MENU_ITEMS } from "@/constants";

const useMenuItemAction = ({
  canvasRef,
  dispatch,
  historyPointer,
  drawHistory,
  actionMenuItem,
}) => {
  const performDownloadAction = (canvas) => {
    const URL = canvas.toDataURL();
    const anchor = document.createElement("a");
    anchor.href = URL;
    anchor.download = "sketch.jpg";
    anchor.click();
  };
  const applyDrawHistory = (context) => {
    const imageData = drawHistory.current[historyPointer.current];
    context.putImageData(imageData, 0, 0);
  };
  const performRedoAction = (context) => {
    historyPointer.current -= 1;
    applyDrawHistory(context);
  };
  const performUndoAction = (context) => {
    historyPointer.current += 1;
    applyDrawHistory(context);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD.name) {
      performDownloadAction(canvas);
    } else if (actionMenuItem === MENU_ITEMS.UNDO.name) {
      performUndoAction(context);
    } else if (actionMenuItem === MENU_ITEMS.REDO.name) {
      performRedoAction(context);
    }

    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);
};
export default useMenuItemAction;
