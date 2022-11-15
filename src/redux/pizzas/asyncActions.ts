import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Pizza, FetchPizzasArgs } from "./types";

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
