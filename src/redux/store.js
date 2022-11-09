import { configureStore } from "@reduxjs/toolkit";

import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzasSlice";

const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
