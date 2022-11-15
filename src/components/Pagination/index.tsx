import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";

import { changeCurrentPage } from "../../redux/filter/slice";
import { filterSelector } from "../../redux/filter/selectors";

import styles from "./Pagination.module.scss";

export const Pagination: React.FC = () => {
  const { currentPage } = useSelector(filterSelector);
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.pagination}
      onPageChange={(e) => dispatch(changeCurrentPage(e.selected + 1))}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={5}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
};
