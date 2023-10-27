import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS, COLORS } from "@/constants";

const initialState = {
  [MENU_ITEMS.PENCIL.name]: {
    color: COLORS.BLACK,
    size: 3,
  },
  [MENU_ITEMS.ERASER.name]: {
    color: COLORS.WHITE,
    size: 3,
  },
  [MENU_ITEMS.UNDO.name]: {},
  [MENU_ITEMS.REDO.name]: {},
  [MENU_ITEMS.DOWNLOAD.name]: {},
};

const toolboxSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      const { item, color } = action.payload;
      state[item].color = color;
    },
    changeBrushSize: (state, action) => {
      const { item, size } = action.payload;
      state[item].size = size;
    },
  },
});

export const { changeColor, changeBrushSize } = toolboxSlice.actions;
export default toolboxSlice.reducer;
