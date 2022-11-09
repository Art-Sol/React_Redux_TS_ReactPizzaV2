import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategoryIndex: 0,
  activeSortType: {
    name: "популярности (убыв.)",
    sortProp: "rating",
    order: "desc",
  },
  currentPage: 1,
  searchValue: "",
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
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.activeCategoryIndex = Number(action.payload.category);
      state.currentPage = Number(action.payload.page);
      state.activeSortType = action.payload.sort;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const filterSelector = (state) => state.filter;

export const {
  changeCategoryIndex,
  changeSortType,
  changeCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
