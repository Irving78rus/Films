import "../App.css";
import React  from "react";
import MoveCard from "./MoveCard/MoveCard";
import CustomPaginator from './CustomPaginator/CustomPaginator'
 

function CategoryFilms({ listFilms, setFilms }) {
  console.log({ listFilms, setFilms });

  return (
    <div className="wrapper">
       <CustomPaginator listFilms={listFilms} setFilms={setFilms}/>
 
      <div>{!!listFilms && <MoveCard listFilms={listFilms}  />}</div>
    </div>
  );
}

export default CategoryFilms;
