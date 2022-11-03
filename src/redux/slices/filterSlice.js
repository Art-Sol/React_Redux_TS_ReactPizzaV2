import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategoryIndex: 0,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategoryIndex: (state, action) => {
      state.activeCategoryIndex = action.payload;
    },
  },
});

export const { changeCategoryIndex } = filterSlice.actions;

export default filterSlice.reducer;
