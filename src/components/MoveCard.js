
import "../App.css";
import React,{useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedFilm } from '../redux/toolkitSlice'


function MoveCard({ listFilms }) {
    const dispatch = useDispatch();
    const addSelectedFilm = (e, film) => {
        dispatch(setSelectedFilm(film))
        e.preventDefault()
    }
    
     
     
      
    return (<div className="top250Wrapper">
        
        {listFilms.items?.map((film, index) => <NavLink to={`/Films/${film.kinopoiskId}`} key={index}
            className={index === 0 ? " bc" : "filmList"}>
            <div>  {index + 1}</div>
            <div className="posterUrlPreview">
                <img src={film.posterUrlPreview} alt="" />
                <div className="ratingOnCard" style={film.rating && film.rating < 6 ? { backgroundColor: 'red' } : null}>{film.rating}</div>
            </div>
            <div className="filmInfo">
                <div className="nameRu">{film.nameRu}</div>
                <div className="nameEn year filmLength">{film.nameEn} {film.year && film.year + `, `}{film.filmLength && (film.filmLength + `, `)}</div>
                <div className="nameRu">{film.countries[0].country}</div>
                <div className="nameRu">{film.genres.map((genre, index) => <span key={index}>{genre.genre + ` `}</span>)}</div>
            </div>
            <div className="ratingInfo">
                <div className="rating" style={film.rating && film.rating > 6 ? { color: '#3bb33b' } : null}>{film.rating}</div>
                <div className="ratingVoteCount">{film.ratingVoteCount}</div>
            </div>
            <div>
                <button onClick={(e) => { addSelectedFilm(e, film) }}> Добавить в избранное </button>
            </div>
        </NavLink>
        )}
      
    </div>
    )
}

export default MoveCard