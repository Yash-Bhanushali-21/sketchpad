import { useSelector, useDispatch } from "react-redux";
import { changeColor, changeBrushSize } from "@/slice/toolboxSlice";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constants";
import classNames from "classnames";

const Toolbox = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color } = useSelector((state) => state.toolbox[activeMenuItem]);

  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL.name;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL.name ||
    activeMenuItem === MENU_ITEMS.ERASER.name;

  const updateBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  };
  const updateColor = (newColor) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  };
  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            {Object.keys(COLORS).map((colorKey) => {
              const colorBoxClasses = classNames(styles.colorBox, {
                [styles.active]: COLORS[colorKey] === color,
              });

              return (
                <div
                  key={COLORS[colorKey]}
                  className={colorBoxClasses}
                  style={{ backgroundColor: COLORS[colorKey] }}
                  onClick={() => updateColor(COLORS[colorKey])}
                />
              );
            })}
          </div>
        </div>
      )}
      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>
            {MENU_ITEMS.ERASER.name === activeMenuItem
              ? "Eraser Size "
              : "Brush Size "}
          </h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={updateBrushSize}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbox;
