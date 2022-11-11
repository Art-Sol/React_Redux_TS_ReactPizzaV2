import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";

import {
  changeCurrentPage,
  filterSelector,
} from "../../redux/slices/filterSlice";

import styles from "./Pagination.module.scss";

const Pagination: React.FC = () => {
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

export default Pagination;
