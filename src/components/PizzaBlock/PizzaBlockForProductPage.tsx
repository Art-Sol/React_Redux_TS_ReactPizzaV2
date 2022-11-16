import React from "react";

import { SvgPlusIcon, PizzaBlockType } from "../../components";

export const PizzaBlockForProductPage: React.FC<PizzaBlockType> = (props) => {
  const {
    imageUrl,
    title,
    price,
    handleAddPizza,
    addedCount,
    pizzaTypes,
    pizzaSizes,
  } = props;

  return (
    <div className="container">
      <div className="product-pizza">
        <div className="product-pizza__image">
          <img src={imageUrl} alt="" />
        </div>
        <div>
          <h2 className="product-pizza__title">Пицца: "{title}"</h2>
          <p className="product-pizza__description">
            Тут идет описание пиццы - какие ингридиенты в нее входят, насколько
            она вкусна, восхитительная и вот это вот все :)
          </p>
          <div className="product-pizza__properties">
            <div className="product-pizza__selector">
              <p>Выберите тесто:</p>
              <ul>{pizzaTypes}</ul>
            </div>
            <div className="product-pizza__selector">
              <p>Выберите размер:</p>
              <ul>{pizzaSizes}</ul>
            </div>
          </div>
          <div className="product-pizza__bot">
            <h4 className="product-pizza__price">{price} ₽</h4>
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
      </div>
    </div>
  );
};
