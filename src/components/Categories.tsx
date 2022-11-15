import React from "react";
import { useDispatch } from "react-redux";

import { changeCategoryIndex } from "../redux/filter/slice";

type CategoriesType = string[];
type CategoriesPropsType = {
  activeCategoryIndex: number;
};

const categories: CategoriesType = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesPropsType> = React.memo(
  ({ activeCategoryIndex }) => {
    const dispatch = useDispatch();
    const categoriesMenu = renderCategories(categories);

    function renderCategories(arrayCategories: CategoriesType) {
      return arrayCategories.map((categoryName, i) => (
        <li
          key={i}
          onClick={() => dispatch(changeCategoryIndex(i))}
          className={activeCategoryIndex === i ? "active" : ""}
        >
          {categoryName}
        </li>
      ));
    }

    return (
      <div className="categories">
        <ul>{categoriesMenu}</ul>
      </div>
    );
  }
);

export default Categories;
