import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategoryIndex: 0,
  activeSortType: {
    name: "популярности (убыв.)",
    sortProp: "rating",
    order: "desc",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategoryIndex: (state, action) => {
      state.activeCategoryIndex = action.payload;
    },
    changeSortType: (state, action) => {
      state.activeSortType = action.payload;
    },
  },
});

export const { changeCategoryIndex, changeSortType } = filterSlice.actions;

export default filterSlice.reducer;
