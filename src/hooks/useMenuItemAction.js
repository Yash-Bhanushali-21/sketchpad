import { useEffect } from "react";
import { actionItemClick } from "@/slice/menuSlice";
import { MENU_ITEMS } from "@/constants";

const useMenuItemAction = ({ canvasRef, dispatch, actionMenuItem }) => {
  const performDownloadAction = (canvas) => {
    const URL = canvas.toDataURL();
    const anchor = document.createElement("a");
    anchor.href = URL;
    anchor.download = "sketch.jpg";
    anchor.click();
  };
  const performRedoUndoAction = (context) => {
    if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO.name)
      historyPointer.current -= 1;
    if (
      historyPointer.current < drawHistory.current.length - 1 &&
      actionMenuItem === MENU_ITEMS.REDO.name
    )
      historyPointer.current += 1;
    const imageData = drawHistory.current[historyPointer.current];
    context.putImageData(imageData, 0, 0);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD.name) {
      performDownloadAction(canvas);
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO.name ||
      actionMenuItem === MENU_ITEMS.REDO.name
    ) {
      performRedoUndoAction(context);
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);
};
export default useMenuItemAction;
