export type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export type FetchPizzasArgs = {
  catagoryName: string | number;
  sortName: string;
  orderType: string;
  searchData: string;
  page: number;
  limit: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface IPizzaSliceState {
  pizzas: Pizza[];
  status: Status;
}
