 
import "../App.css";
import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import MoveCard from "./MoveCard";
import { createNumbersForCell} from '../utils/logic'
function CategoryFilms({ listFilms, setFilms }) {
  const dispatch = useDispatch();
  const portionSize =5
  const [pagesCount,setPageCount]= useState([])
  const [currentPage,setCurrentPage]=useState(1)
  let [portionNumber, setPortionNumber] = useState(1)
  useEffect(() => {
    dispatch(setFilms());
  }, []);
  // получать список фильмов по номеру старницы numberPage==item+1 порнография какая-то
  const getFilmsByPagesCount =(numberPage)=>{
    setCurrentPage(numberPage-1)
    dispatch(setFilms(numberPage));
  }
  
  useEffect(() => {
      
     if(listFilms.total>=0){
         
         setPageCount(createNumbersForCell(listFilms.total))
      }
  }, [listFilms])
  
  let portionCount
  let leftPortionPageNumber
  let rightPortionPageNumber
  if(pagesCount.length){
    console.log(pagesCount.length);
    portionCount = Math.ceil(pagesCount.length/portionSize)
    leftPortionPageNumber = (portionNumber-1)*portionSize
    rightPortionPageNumber =  portionNumber * portionSize 
  }


console.log(currentPage);
  return (
    <div className="top250Wrapper">
      <div className="paginationWrapper"> 
      {portionNumber>1&&<button onClick={()=>{setPortionNumber(portionNumber-1)}}>prev</button>}
        {pagesCount&&pagesCount
         .filter(p=>p>=leftPortionPageNumber&&p<=rightPortionPageNumber)
        .map((item,index)=><div key={index} className={item===currentPage?"paginationItem paginationItem_active":"paginationItem"}  onClick={()=>getFilmsByPagesCount(item+1)}>{item+1}</div>)}
        {portionCount>portionNumber&&<button onClick={()=>{setPortionNumber(portionNumber+1)}}>next</button>}

        </div>
      <div>{!!listFilms && <MoveCard listFilms={listFilms} />}</div>
    </div>
  );
}

export default CategoryFilms;
 
