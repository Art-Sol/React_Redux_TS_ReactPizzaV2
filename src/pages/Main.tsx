import React from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import {
  setFilters,
  filterSelector,
  IFilterSliceState,
} from "../redux/slices/filterSlice";
import { fetchPizzas, pizzaSelector, Pizza } from "../redux/slices/pizzasSlice";

import { sortTypes } from "../components/Sort";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import ErrorRequest from "../components/PizzaBlock/ErrorRequest";
import Pagination from "../components/Pagination";

const Main: React.FC = () => {
  const { pizzas, status } = useSelector(pizzaSelector);
  const { activeCategoryIndex, activeSortType, currentPage, searchValue } =
    useSelector(filterSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const limitItemPerPage = 4;
  const pizzaBlocks = renderPizzaBlockList(pizzas, limitItemPerPage);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setQueryParamsToFilters(); // eslint-disable-next-line
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
    isMounted.current = true; // eslint-disable-next-line
  }, [activeCategoryIndex, activeSortType, searchValue, currentPage]);

  // Функиця устанавливает в http адрес параметры фильтрации
  //	(чтобы можно было поделиться ссылкой на определенный набор пицц)
  function setFilterParamsToQuery(
    category: number,
    sort: { sortProp: string; order: string },
    page: number
  ): void {
    const queryString = qs.stringify({
      category,
      sort: sort.sortProp,
      order: sort.order,
      page,
    });
    navigate(`?${queryString}`);
  }

  // Функиця берет из http адреса параметры фильтрации и устанавливает их
  // (если пользоваталю дали ссылку на определенный набор пицц)
  function setQueryParamsToFilters() {
    if (window.location.search) {
      const queryParams = qs.parse(window.location.search.substring(1));
      const { category, page, sort, order } = queryParams;

      const activeCategoryIndex = Number(category);
      const currentPage = Number(page);
      const activeSortType = sortTypes
        .filter((item) => item.sortProp === sort)
        .find((item) => item.order === order);

      if (activeSortType !== undefined) {
        const params: IFilterSliceState = {
          activeCategoryIndex,
          currentPage,
          activeSortType,
        };

        dispatch(setFilters(params));
        isSearch.current = true;
      }
    }
  }

  const getPizzas = async (
    category: number,
    sort: { sortProp: string; order: string },
    searchValue: string | undefined,
    page: number,
    limit: number
  ) => {
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

  function renderPizzaBlockList(arrayPizzas: Pizza[], limit: number) {
    if (status === "loading") {
      return [...new Array(limit)].map((_, i) => <Skeleton key={i} />);
    }

    if (status === "error") {
      return <ErrorRequest />;
    }

    return arrayPizzas.map((pizza: any) => (
      <PizzaBlock key={pizza.id} {...pizza} />
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
