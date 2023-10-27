import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const COLORS = {
  BLACK: "black",
  RED: "red",
  GREEN: "green",
  BLUE: "blue",
  ORANGE: "orange",
  YELLOW: "yellow",
  WHITE: "white",
};
const MENU_ITEMS = {
  PENCIL: {
    name: "PENCIL",
    icon: faPencil,
  },
  ERASER: {
    name: "ERASER",
    icon: faEraser,
  },
  UNDO: {
    name: "UNDO",
    icon: faRotateLeft,
  },
  REDO: {
    name: "REDO",
    icon: faRotateRight,
  },
  DOWNLOAD: {
    name: "DOWNLOAD",
    icon: faFileArrowDown,
  },
};

export { COLORS, MENU_ITEMS };
