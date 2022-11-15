import { CartPizzaItem } from "../redux/cart/types";

export const calcTotalPrice = (items: CartPizzaItem[]): number => {
  // console.log(items);
  return items.reduce((sum, item) => {
    // console.log(item.price);
    // console.log(item.count);
    if (typeof item.count !== "undefined") {
      return item.price * item.count + sum;
    } else {
      return item.price + sum;
    }
  }, 0);
};
