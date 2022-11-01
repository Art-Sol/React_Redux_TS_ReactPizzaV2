import React from "react";

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const categoriesMenu = renderCategories(categories);

  function renderCategories(array) {
    return array.map((item, i) => (
      <li
        key={i}
        onClick={() => setActiveIndex(i)}
        className={activeIndex === i ? "active" : ""}
      >
        {item}
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
