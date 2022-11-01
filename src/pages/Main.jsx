import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Main = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const pizzaBlocks = renderPizzaBlockList(pizzas);

  React.useEffect(() => {
    getHttpRequest();
  }, []);

  function getHttpRequest() {
    fetch("https://63613cd267d3b7a0a6c1cb49.mockapi.io/items")
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }

  function renderPizzaBlockList(arrayPizzasProps) {
    if (isLoading) {
      return [...new Array(6)].map((_, i) => <Skeleton key={i} />);
    }

    return arrayPizzasProps.map((pizzaProps) => (
      <PizzaBlock key={pizzaProps.id} {...pizzaProps} />
    ));
  }

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzaBlocks}</div>
    </>
  );
};

export default Main;
