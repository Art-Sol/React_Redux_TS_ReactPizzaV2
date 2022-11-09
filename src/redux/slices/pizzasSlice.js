import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params) => {
    const { catagoryName, sortName, orderType, searchData, page, limit } =
      params;

    const url = searchData
      ? `https://63613cd267d3b7a0a6c1cb49.mockapi.io/items?page=${page}&limit=${limit}&search=${searchData}`
      : `https://63613cd267d3b7a0a6c1cb49.mockapi.io/items?page=${page}&limit=${limit}&category=${catagoryName}&sortBy=${sortName}&order=${orderType}`;

    const { data } = await axios.get(url);
    return data;
  }
);

const initialState = {
  pizzas: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.pizzas = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.pizzas = [];
    },
  },
});

export const pizzaSelector = (state) => state.pizza;

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
