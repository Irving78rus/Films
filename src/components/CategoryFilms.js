 
import "../App.css";
import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import MoveCard from "./MoveCard";
import { createNumbersForCell} from '../utils/logic'
function CategoryFilms({ listFilms, setFilms }) {
  const dispatch = useDispatch();
  
  const [pagesCount,setPageCount]= useState(null)

  useEffect(() => {
    dispatch(setFilms());
  }, []);
  // получать список фильмов по номеру старницы
  const getFilmsByPagesCount =(numberPage)=>{
    console.log(numberPage);
    dispatch(setFilms(numberPage));
  }
  
  useEffect(() => {
      
     if(listFilms.total>=0){
         
         setPageCount(createNumbersForCell(listFilms.total))
      }
  }, [listFilms])
  return (
    <div className="top250Wrapper">
      <div className="paginationWrapper"> 
        {pagesCount&&pagesCount.map((item,index)=><div key={index} className="paginationItem" onClick={()=>getFilmsByPagesCount(item+1)}>{item+1}</div>)}
        </div>
      <div>{!!listFilms && <MoveCard listFilms={listFilms} />}</div>
    </div>
  );
}

export default CategoryFilms;
 
