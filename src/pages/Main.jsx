import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Main = ({ searchValue }) => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);
  const [activeSortType, setActiveSortType] = React.useState({
    name: "популярности (убыв.)",
    sortProp: "rating",
    order: "desc",
  });

  const pizzaBlocks = renderPizzaBlockList(pizzas);

  React.useEffect(() => {
    getHttpRequest(
      activeCategoryIndex,
      activeSortType,
      searchValue,
      currentPage
    );
  }, [activeCategoryIndex, activeSortType, searchValue, currentPage]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function getHttpRequest(category, sort, searchValue, page) {
    const catagoryName = category === 0 ? "" : category;
    const sortName = sort.sortProp;
    const orderType = sort.order;
    const searchData = searchValue ? searchValue : "";

    const url = searchData
      ? `https://63613cd267d3b7a0a6c1cb49.mockapi.io/items?page=1&limit=4&search=${searchData}`
      : `https://63613cd267d3b7a0a6c1cb49.mockapi.io/items?page=${page}&limit=4&category=${catagoryName}&sortBy=${sortName}&order=${orderType}`;

    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }

  function renderPizzaBlockList(arrayPizzasProps) {
    if (isLoading) {
      return [...new Array(4)].map((_, i) => <Skeleton key={i} />);
    }

    return arrayPizzasProps.map((pizzaProps) => (
      <PizzaBlock key={pizzaProps.id} {...pizzaProps} />
    ));
  }

  const handleSetCategoryIndex = (index) => {
    setActiveCategoryIndex(index);
  };

  const handleSetActiveSortType = (sortType) => {
    setActiveSortType(sortType);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategoryIndex={activeCategoryIndex}
          handleSetCategoryIndex={handleSetCategoryIndex}
        />
        <Sort
          activeSortType={activeSortType}
          handleSetActiveSortType={handleSetActiveSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzaBlocks}</div>
      <Pagination handleSetPage={setCurrentPage} />
    </div>
  );
};

export default Main;
