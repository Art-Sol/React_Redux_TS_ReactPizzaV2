import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { getCartFromLocStor } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

import { ICartSliceState, CartPizzaItem } from "./types";

const { items, totalPrice } = getCartFromLocStor();

const initialState: ICartSliceState = {
  items,
  totalPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartPizzaItem>) {
      const currentItem = action.payload;

      const findItem = state.items.find((item: CartPizzaItem) => {
        if (!currentItem.count) {
          const cloneItem = _.cloneDeep(item);
          delete cloneItem.count;
          return JSON.stringify(cloneItem) === JSON.stringify(currentItem);
        }
        return JSON.stringify(item) === JSON.stringify(currentItem);
      });

      if (findItem && typeof findItem.count !== "undefined") {
        findItem.count++;
      } else {
        currentItem.count = 1;
        state.items.push(currentItem);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItemFromCart(state, action: PayloadAction<CartPizzaItem>) {
      const currentItem = action.payload;

      const findItem = state.items.find(
        (item: CartPizzaItem) =>
          JSON.stringify(item) === JSON.stringify(currentItem)
      );

      if (findItem && findItem.count && findItem.count > 1) {
        const index = state.items.indexOf(findItem);
        const reducedItem = state.items[index];

        if (reducedItem.count) {
          reducedItem.count--;
        }
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    deleteItemInCart(state, action: PayloadAction<CartPizzaItem>) {
      const currentItem = action.payload;

      const findItem = state.items.find(
        (item) => JSON.stringify(item) === JSON.stringify(currentItem)
      );

      if (findItem) {
        const index = state.items.indexOf(findItem);
        state.items.splice(index, 1);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  deleteItemInCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
