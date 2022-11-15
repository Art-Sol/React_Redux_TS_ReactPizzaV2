export type CartPizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  type: string;
  size: number;
  price: number;
  count?: number;
};

export interface ICartSliceState {
  items: CartPizzaItem[];
  totalPrice: number;
}
