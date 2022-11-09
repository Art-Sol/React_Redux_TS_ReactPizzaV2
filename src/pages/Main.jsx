import React from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SearchContext } from "../App";
import { setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import { sortTypes } from "../components/Sort";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import ErrorRequest from "../components/PizzaBlock/ErrorRequest";
import Pagination from "../components/Pagination";

const Main = () => {
  const { pizzas, status } = useSelector((state) => state.pizza);
  const { activeCategoryIndex, activeSortType, currentPage } = useSelector(
    (state) => state.filter
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { searchValue } = React.useContext(SearchContext);

  const limitItemPerPage = 4;
  const pizzaBlocks = renderPizzaBlockList(pizzas, limitItemPerPage);

  React.useEffect(() => {
    setQueryParamsToFilters();
    window.scrollTo(0, 0); // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas(
        activeCategoryIndex,
        activeSortType,
        searchValue,
        currentPage,
        limitItemPerPage
      );
    }
    isSearch.current = false;

    if (isMounted.current) {
      setFilterParamsToQuery(activeCategoryIndex, activeSortType, currentPage);
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [activeCategoryIndex, activeSortType, searchValue, currentPage]);

  function setFilterParamsToQuery(category, sort, page) {
    const queryString = qs.stringify({
      category,
      sort: sort.sortProp,
      order: sort.order,
      page,
    });
    navigate(`?${queryString}`);
  }

  function setQueryParamsToFilters() {
    if (window.location.search) {
      const queryParams = qs.parse(window.location.search.substring(1));
      const sort = sortTypes
        .filter((item) => item.sortProp === queryParams.sort)
        .find((item) => item.order === queryParams.order);
      delete queryParams.order;

      const params = { ...queryParams, sort };

      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }

  const getPizzas = async (category, sort, searchValue, page, limit) => {
    const catagoryName = category === 0 ? "" : category;
    const sortName = sort.sortProp;
    const orderType = sort.order;
    const searchData = searchValue ? searchValue : "";

    const params = {
      catagoryName,
      sortName,
      orderType,
      searchData,
      page,
      limit,
    };

    dispatch(fetchPizzas(params));
  };

  function renderPizzaBlockList(arrayPizzasProps, limit) {
    if (status === "loading") {
      return [...new Array(limit)].map((_, i) => <Skeleton key={i} />);
    }

    if (status === "error") {
      return <ErrorRequest />;
    }

    return arrayPizzasProps.map((pizzaProps) => (
      <PizzaBlock key={pizzaProps.id} {...pizzaProps} />
    ));
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzaBlocks}</div>
      <Pagination />
    </div>
  );
};

export default Main;
