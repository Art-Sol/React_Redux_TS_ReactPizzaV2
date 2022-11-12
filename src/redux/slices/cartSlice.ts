import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

import { RootState } from "../store";

export type CartPizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  type: string;
  size: number;
  price: number;
  count?: number;
};

interface ICartSliceState {
  items: CartPizzaItem[];
  totalPrice: number;
}

const initialState: ICartSliceState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartPizzaItem>) {
      const currentItem = action.payload;

      const findItem = state.items.find((item) => {
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

      state.totalPrice = state.items.reduce((sum, item) => {
        if (typeof item.count !== "undefined") {
          return item.price * item.count + sum;
        } else {
          return item.price + sum;
        }
      }, 0);
    },
    removeItemFromCart(state, action: PayloadAction<CartPizzaItem>) {
      const currentItem = action.payload;

      const findItem = state.items.find(
        (item) => JSON.stringify(item) === JSON.stringify(currentItem)
      );

      if (findItem) {
        if (findItem.count === 1) {
          state.items = state.items.filter(
            (item) => JSON.stringify(item) !== JSON.stringify(findItem)
          );
        } else if (
          typeof findItem.count !== "undefined" &&
          findItem.count > 1
        ) {
          const index = state.items.indexOf(findItem);
          const reducedItem = state.items[index];

          if (reducedItem.count) {
            reducedItem.count--;
          }
        }
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        if (typeof item.count !== "undefined") {
          return item.price * item.count + sum;
        } else {
          return item.price + sum;
        }
      }, 0);
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

      state.totalPrice = state.items.reduce((sum, item) => {
        if (typeof item.count !== "undefined") {
          return item.price * item.count + sum;
        } else {
          return item.price + sum;
        }
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const {
  addItemToCart,
  removeItemFromCart,
  deleteItemInCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
