import "./CustomPaginator.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNumbersForCell, paginationHelper } from "../../utils/logic";

function CustomPaginator({ listFilms, setFilms }) {
  const dispatch = useDispatch();
  const [pagesCount, setPageCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [portionNumber, setPortionNumber] = useState(1);
  const query = useSelector((state) => state.formSlice.queryFilms);

  useEffect(() => {
    if (setFilms) {
      dispatch(setFilms({ query, numberPage: 1 }));
    }
  }, []);

  const getFilmsByPagesCount = (numberPage) => {
    const data = { query, numberPage };
    dispatch(setFilms(data));
    setCurrentPage(numberPage);
  };

  useEffect(() => {
    if (listFilms.totalPages >= 0) {
      setPageCount(createNumbersForCell(listFilms.totalPages));
    }
  }, [listFilms]);

  return (
    <div className="pagination wrapper">
      {listFilms.totalPages && (
        <div className="pagination_wrapper">
          {portionNumber > 1 && (
            <button
              onClick={() => {
                setPortionNumber(portionNumber - 1);
              }}
            >
              prev
            </button>
          )}
          {pagesCount.length > 0 &&
            pagesCount
              .filter(
                (p) =>
                  p >=
                    paginationHelper(pagesCount, portionNumber)
                      .leftPortionPageNumber &&
                  p <=
                    paginationHelper(pagesCount, portionNumber)
                      .rightPortionPageNumber
              )
              .map((item, index) => (
                <div
                  key={index}
                  className={
                    item === currentPage
                      ? "pagination__item pagination__item_active"
                      : "pagination__item"
                  }
                  onClick={() => getFilmsByPagesCount(item)}
                >
                  {item}
                </div>
              ))}
          {paginationHelper(pagesCount, portionNumber).portionCount >
            portionNumber && (
            <button
              onClick={() => {
                setPortionNumber(portionNumber + 1);
              }}
            >
              next
            </button>
          )}
        </div>
      )}

      
    </div>
  );
}

export default CustomPaginator;
