import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart, cartSelector } from "../../redux/slices/cartSlice";

const PizzaBlock = ({ id, title, price, imageUrl, sizes, types }) => {
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);

  const { items } = useSelector(cartSelector);
  const dispatch = useDispatch();

  const pizzaTypeNames = ["тонкое", "традиционное"];

  const pizzaSizes = renderPizzaSizesList(sizes);
  const pizzaTypes = renderPizzaTypesList(types, pizzaTypeNames);
  const addedCount = renderAddedCounterElement(items, id);

  function renderPizzaSizesList(arraySizes) {
    return arraySizes.map((item, i) => (
      <li
        key={i}
        className={activeSize === i ? "active" : ""}
        onClick={() => setActiveSize(i)}
      >
        {item} см.
      </li>
    ));
  }

  function renderPizzaTypesList(arrayTypes, pizzaTypeNames) {
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

  function renderAddedCounterElement(cartItems, curItemId) {
    const findCurItemInCart = cartItems.filter((item) => item.id === curItemId);
    let count;
    if (findCurItemInCart.length > 0) {
      count = findCurItemInCart.reduce((acc, item) => {
        return acc + item.count;
      }, 0);
    }

    return count ? <i>{count}</i> : null;
  }

  const handleAddPizza = () => {
    const currentPizza = {
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
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>{pizzaTypes}</ul>
        <ul>{pizzaSizes}</ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          onClick={handleAddPizza}
          className="button button--outline button--add"
        >
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
          <span>Добавить</span>
          {addedCount}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
