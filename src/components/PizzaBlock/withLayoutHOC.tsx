import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart } from "../../redux/cart/slice";
import { cartSelector } from "../../redux/cart/selectors";

import { Pizza } from "../../redux/pizzas/types";
import { CartPizzaItem } from "../../redux/cart/types";

export const pizzaTypeNames = ["тонкое", "традиционное"];

export type PizzaBlockType = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  handleAddPizza: () => void;
  addedCount: JSX.Element | null;
  pizzaTypes: JSX.Element[];
  pizzaSizes: JSX.Element[];
};

export const withLayout = (PizzaBlockComponent: React.FC<PizzaBlockType>) => {
  return (props: Pizza) => {
    const { id, title, price, imageUrl, sizes, types } = props;
    const [activeSize, setActiveSize] = React.useState<number>(0);
    const [activeType, setActiveType] = React.useState<number>(0);
    const { items } = useSelector(cartSelector);
    const dispatch = useDispatch();

    const pizzaSizes = renderPizzaSizesList(sizes);
    const pizzaTypes = renderPizzaTypesList(types, pizzaTypeNames);
    const addedCount = renderAddedCounterElement(items, id);

    let isMounted = React.useRef(false);

    React.useEffect(() => {
      if (isMounted.current) {
        const json = JSON.stringify(items);
        localStorage.setItem("cartItems", json);
      }
      isMounted.current = true;
    }, [items]);

    function renderPizzaSizesList(arraySizes: number[]) {
      return arraySizes.map((item: number, i: number) => (
        <li
          key={i}
          className={activeSize === i ? "active" : ""}
          onClick={() => setActiveSize(i)}
        >
          {item} см.
        </li>
      ));
    }

    function renderPizzaTypesList(
      arrayTypes: number[],
      pizzaTypeNames: string[]
    ) {
      return arrayTypes.map((item, i) => (
        <li
          key={i}
          className={activeType === i ? "active" : ""}
          onClick={() => setActiveType(i)}
        >
          {pizzaTypeNames[item]}
        </li>
      ));
    }

    function renderAddedCounterElement(
      cartItems: CartPizzaItem[],
      curItemId: string
    ) {
      const findCurItemInCart = cartItems.filter(
        (item: CartPizzaItem) => item.id === curItemId
      );
      let count;
      if (findCurItemInCart.length > 0) {
        count = findCurItemInCart.reduce((acc, item: CartPizzaItem) => {
          return item.count ? acc + item.count : acc;
        }, 0);
      }

      return count ? <i>{count}</i> : null;
    }

    const handleAddPizza = () => {
      const currentPizza: CartPizzaItem = {
        id,
        title,
        imageUrl,
        type: pizzaTypeNames[activeType],
        size: sizes[activeSize],
        price,
      };
      dispatch(addItemToCart(currentPizza));
    };

    return (
      <PizzaBlockComponent
        {...props}
        handleAddPizza={handleAddPizza}
        addedCount={addedCount}
        pizzaTypes={pizzaTypes}
        pizzaSizes={pizzaSizes}
      />
    );
  };
};

//  Svg icons:

export const SvgPlusIcon: React.FC = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
        fill="white"
      />
    </svg>
  );
};
