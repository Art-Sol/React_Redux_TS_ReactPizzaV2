import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const currentItem = action.payload;

      const findItem = state.items.find((item) => {
        if (!currentItem.count) {
          const cloneItem = _.cloneDeep(item);
          delete cloneItem.count;
          return JSON.stringify(cloneItem) === JSON.stringify(currentItem);
        }
        return JSON.stringify(item) === JSON.stringify(currentItem);
      });

      if (findItem) {
        findItem.count++;
      } else {
        currentItem.count = 1;
        state.items.push(currentItem);
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    removeItemFromCart(state, action) {
      const currentItem = action.payload;

      const findItem = state.items.find(
        (item) => JSON.stringify(item) === JSON.stringify(currentItem)
      );

      if (findItem) {
        if (findItem.count === 1) {
          state.items = state.items.filter(
            (item) => JSON.stringify(item) !== JSON.stringify(findItem)
          );
        } else if (findItem.count > 1) {
          const index = state.items.indexOf(findItem);
          state.items[index].count--;
        }
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    deleteItemInCart(state, action) {
      const currentItem = action.payload;

      const findItem = state.items.find(
        (item) => JSON.stringify(item) === JSON.stringify(currentItem)
      );

      if (findItem) {
        const index = state.items.indexOf(findItem);
        state.items.splice(index, 1);
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state) => state.cart;

export const {
  addItemToCart,
  removeItemFromCart,
  deleteItemInCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
