import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type SortTypeItem = {
  name: string;
  sortProp: string; //"rating" | "price" | "title"
  order: string; //"asc" | "desc"
};

interface IFilterSliceState {
  activeCategoryIndex: number;
  activeSortType: SortTypeItem;
  currentPage: number;
  searchValue: string;
}

const initialState: IFilterSliceState = {
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
    changeCategoryIndex: (state, action: PayloadAction<number>) => {
      state.activeCategoryIndex = action.payload;
    },
    changeSortType: (state, action: PayloadAction<SortTypeItem>) => {
      state.activeSortType = action.payload;
    },
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        category: number;
        page: number;
        sort: SortTypeItem;
      }>
    ) => {
      state.activeCategoryIndex = Number(action.payload.category);
      state.currentPage = Number(action.payload.page);
      state.activeSortType = action.payload.sort;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const {
  changeCategoryIndex,
  changeSortType,
  changeCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
