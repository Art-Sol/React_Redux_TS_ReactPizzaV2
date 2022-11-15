import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import filter from "./filter/slice";
import cart from "./cart/slice";
import pizza from "./pizzas/slice";

const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
  devTools: process.env.NODE_ENV !== "production",
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export default store;
