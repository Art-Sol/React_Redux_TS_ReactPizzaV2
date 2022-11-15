import React from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import { setFilters } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizzas/asyncActions";
import { filterSelector } from "../redux/filter/selectors";
import { pizzaSelector } from "../redux/pizzas/selectors";

import { sortTypes } from "../components";

import {
  Categories,
  Sort,
  PizzaBlock,
  Skeleton,
  ErrorRequest,
  Pagination,
} from "../components";

import { IFilterSliceState } from "../redux/filter/types";
import { Pizza } from "../redux/pizzas/types";

type GetPizzasArgs = {
  activeCategoryIndex: number;
  activeSortType: { sortProp: string; order: string };
  searchValue: string | undefined;
  currentPage: number;
  limitItemPerPage: number;
};

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
      getPizzas({
        activeCategoryIndex,
        activeSortType,
        searchValue,
        currentPage,
        limitItemPerPage,
      });
    }
    isSearch.current = false;

    if (isMounted.current) {
      setFilterParamsToQuery(activeCategoryIndex, activeSortType, currentPage);
    }
    isMounted.current = true; // eslint-disable-next-line
  }, [activeCategoryIndex, activeSortType, searchValue, currentPage]);

  //  Функиця устанавливает в http адрес параметры фильтрации
  //  (чтобы можно было поделиться ссылкой на определенный набор пицц)
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

  const getPizzas = async ({
    activeCategoryIndex,
    activeSortType,
    currentPage,
    limitItemPerPage,
    searchValue,
  }: GetPizzasArgs) => {
    const catagoryName = activeCategoryIndex === 0 ? "" : activeCategoryIndex;
    const sortName = activeSortType.sortProp;
    const orderType = activeSortType.order;
    const searchData = searchValue ? searchValue : "";

    const params = {
      catagoryName,
      sortName,
      orderType,
      searchData,
      page: currentPage,
      limit: limitItemPerPage,
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

    return arrayPizzas.map((pizza: Pizza) => (
      <PizzaBlock key={pizza.id} {...pizza} />
    ));
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategoryIndex={activeCategoryIndex} />
        <Sort activeSortType={activeSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzaBlocks}</div>
      <Pagination />
    </div>
  );
};

export default Main;
