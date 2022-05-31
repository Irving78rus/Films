
import "../App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoveCard from "./MoveCard";
import { createNumbersForCell, paginationHelper } from '../utils/logic'
function CategoryFilms({ listFilms, setFilms }) {
 
  const dispatch = useDispatch();

  const [pagesCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [portionNumber, setPortionNumber] = useState(1)
  const query = useSelector(state => state.toolkitSlice.queryFilms)
  useEffect(() => {
    
    dispatch(setFilms({ query, numberPage: 1 }));
  }, []);
 
  // получать список фильмов по номеру старницы numberPage==item+1 порнография какая-то
  const getFilmsByPagesCount = (numberPage) => {
    const data = { query, numberPage }
    //сделать объект
    dispatch(setFilms(data));
    setCurrentPage(numberPage - 1)
  }

  useEffect(() => {
    
    if (listFilms.totalPages >= 0) {

      setPageCount(createNumbersForCell(listFilms.totalPages))
    }
  }, [listFilms])

  return (
    <div className="top250Wrapper">
      <div className="paginationWrapper">

        {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>prev</button>}

        {pagesCount.length > 0 && pagesCount
          .filter(p => p >= paginationHelper(pagesCount, portionNumber).leftPortionPageNumber && p <= paginationHelper(pagesCount, portionNumber).rightPortionPageNumber)
          .map((item, index) => <div key={index} className={item === currentPage ? "paginationItem paginationItem_active" : "paginationItem"} onClick={() => getFilmsByPagesCount(item + 1)}>{item + 1}</div>)}

        {paginationHelper(pagesCount, portionNumber).portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>next</button>}

      </div>
      <div>{!!listFilms && <MoveCard listFilms={listFilms} />}</div>
    </div>
  );
}

export default CategoryFilms;

