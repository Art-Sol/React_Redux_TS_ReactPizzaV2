import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { changeSortType, filterSelector } from "../redux/slices/filterSlice";

// types and interfaces
import { SortTypeItem } from "../redux/slices/filterSlice";

export const sortTypes: SortTypeItem[] = [
  { name: "популярности (возр.)", sortProp: "rating", order: "asc" },
  { name: "популярности (убыв.)", sortProp: "rating", order: "desc" },
  { name: "цене (возр.)", sortProp: "price", order: "asc" },
  { name: "цене (убыв.)", sortProp: "price", order: "desc" },
  { name: "алфавиту (возр.)", sortProp: "title", order: "asc" },
  { name: "алфавиту (убыв.)", sortProp: "title", order: "desc" },
];

const Sort: React.FC = () => {
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const { activeSortType } = useSelector(filterSelector);
  const dispatch = useDispatch();

  const sortPopupBlock = renderSortPopupBlock(sortTypes, activeSortType);
  const sortPopupRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sortPopupRef.current &&
      !event.composedPath().includes(sortPopupRef.current)
    ) {
      setIsOpenPopup(false);
    }
  };

  const handleSelectActiveSortType = (sortType: SortTypeItem) => {
    dispatch(changeSortType(sortType));
    setIsOpenPopup((isOpenPopup) => !isOpenPopup);
  };

  function renderSortPopupBlock(
    arraySortTypes: SortTypeItem[],
    activeSortType: SortTypeItem
  ) {
    const sortTypesList = arraySortTypes.map((currentSortType, i) => (
      <li
        key={i}
        onClick={() => handleSelectActiveSortType(currentSortType)}
        className={activeSortType.name === currentSortType.name ? "active" : ""}
      >
        {currentSortType.name}
      </li>
    ));

    return (
      <div className="sort__popup">
        <ul>{sortTypesList}</ul>
      </div>
    );
  }

  return (
    <div ref={sortPopupRef} className="sort">
      <div className="sort__label">
        <SvgSortArrowUpIcon />
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpenPopup((isOpenPopup) => !isOpenPopup)}>
          {activeSortType.name}
        </span>
      </div>
      {isOpenPopup && sortPopupBlock}
    </div>
  );
};

export default Sort;

//  Svg icons:

const SvgSortArrowUpIcon: React.FC = () => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
        fill="#2C2C2C"
      />
    </svg>
  );
};
