import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";

export type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

type FetchPizzasArgs = {
  catagoryName: string | number;
  sortName: string;
  orderType: string;
  searchData: string;
  page: number;
  limit: number;
};

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface IPizzaSliceState {
  pizzas: Pizza[];
  status: Status;
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  "pizza/fetchPizzas",
  async (params) => {
    const { catagoryName, sortName, orderType, searchData, page, limit } =
      params;

    const url = searchData
      ? `https://63613cd267d3b7a0a6c1cb49.mockapi.io/items?page=${page}&limit=${limit}&search=${searchData}`
      : `https://63613cd267d3b7a0a6c1cb49.mockapi.io/items?page=${page}&limit=${limit}&category=${catagoryName}&sortBy=${sortName}&order=${orderType}`;

    const { data } = await axios.get<Pizza[]>(url);
    return data;
  }
);

const initialState: IPizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<Pizza[]>) => {
        state.pizzas = action.payload;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },
});

export const pizzaSelector = (state: RootState) => state.pizza;

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
