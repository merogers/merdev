import React from "react";
import { Link } from "react-router-dom";

// --- Pagination --- //

const Pagination = ({
  totalBlogs,
  setCurrentPage,
  currentPage,
  blogsPerPage,
}) => {
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div>Pages:</div>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <Link
              to="#"
              onClick={() => paginate(number)}
              className={number === currentPage ? "active" : null}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
