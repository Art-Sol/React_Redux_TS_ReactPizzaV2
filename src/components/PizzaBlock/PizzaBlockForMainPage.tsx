import React from "react";
import { Link } from "react-router-dom";

import { SvgPlusIcon, PizzaBlockType } from "../../components";

export const PizzaBlockForMainPage: React.FC<PizzaBlockType> = (props) => {
  const {
    id,
    imageUrl,
    title,
    price,
    handleAddPizza,
    addedCount,
    pizzaTypes,
    pizzaSizes,
  } = props;

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
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
          <SvgPlusIcon />
          <span>Добавить</span>
          {addedCount}
        </button>
      </div>
    </div>
  );
};
