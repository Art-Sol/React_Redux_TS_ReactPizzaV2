import { useSelector, useDispatch } from "react-redux";
import {
  changeCategoryIndex,
  filterSelector,
} from "../redux/slices/filterSlice";

const Categories = () => {
  const { activeCategoryIndex } = useSelector(filterSelector);
  const dispatch = useDispatch();

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const categoriesMenu = renderCategories(categories);

  function renderCategories(arrayCategories) {
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
};

export default Categories;
