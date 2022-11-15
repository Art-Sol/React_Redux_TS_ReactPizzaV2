import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLocStor = () => {
  const data = localStorage.getItem("cartItems");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = items.length ? calcTotalPrice(items) : 0;

  return {
    items,
    totalPrice,
  };
};
