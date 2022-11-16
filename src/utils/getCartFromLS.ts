import { calcTotalPrice } from "./calcTotalPrice";
import { ICartSliceState } from "../redux/cart/types";

export const getCartFromLocStore = (): ICartSliceState => {
  const data = localStorage.getItem("cartItems");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = items.length ? calcTotalPrice(items) : 0;

  return {
    items,
    totalPrice,
  };
};
