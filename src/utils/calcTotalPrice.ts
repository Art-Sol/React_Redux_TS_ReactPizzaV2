import { CartPizzaItem } from "../redux/cart/types";

export const calcTotalPrice = (items: CartPizzaItem[]): number => {
  return items.reduce((sum, item) => {
    if (typeof item.count !== "undefined") {
      return item.price * item.count + sum;
    } else {
      return item.price + sum;
    }
  }, 0);
};
