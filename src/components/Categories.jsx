const Categories = ({ activeCategoryIndex, handleSetCategoryIndex }) => {
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
        onClick={() => handleSetCategoryIndex(i)}
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
