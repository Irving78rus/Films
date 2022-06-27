import "./MoveCard.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilm, deleteSelectedFilm,errorNull } from "../../redux/filmContentSlice";
import { Button, Toast } from '@skbkontur/react-ui';

function MoveCard({ listFilms }) {
  const dispatch = useDispatch();
  const selectedFilms = useSelector(
    (state) => state.filmContentSlice.selectedFilm.items
  );
  const addSelectedFilm = (e, film) => {
    dispatch(setSelectedFilm(film));
    e.preventDefault();
  };
  const addDeleteSelectedFilm = (e, film) => {
    e.preventDefault();
    dispatch(deleteSelectedFilm(film));
  };
  const error = useSelector((state) => state.filmContentSlice.error);
  error&&dispatch(errorNull());
  
  return (
    <div className="list-films wrapper">
      {error &&  Toast.push(`${error}`)}
      {listFilms.items?.map((film, index) => (
        <NavLink
          to={`/Films/${film.kinopoiskId}`}
          key={index}
          className={index === 0 ? "first-film-item" : "film-item"}
        >
          <div> {index + 1}</div>
          <div className="list-films__poster-url-preview">
            <img src={film.posterUrlPreview} alt="" />
            <div
              className="list-films__rating-on-card"
              style={
                film.rating && film.rating < 6
                  ? { backgroundColor: "red" }
                  : null
              }
            >
              {film.rating}
            </div>
          </div>
          <div className="list-films__film-info">
            <div >{film.nameRu}</div>
            <div >
              {film.nameEn} {film.year && film.year + `, `}
              {film.filmLength && film.filmLength + `, `}
            </div>
            <div >{film.countries[0].country}</div>
            <div  >
              {film.genres.map((genre, index) => (
                <span key={index}>{genre.genre + ` `}</span>
              ))}
            </div>
          </div>
          <div className="list-films__rating-info">
            <div
              className="list-films__rating"
              style={
                film.rating && film.rating > 6 ? { color: "#3bb33b" } : null
              }
            >
              {film.rating}
            </div>
            <div className="list-films__rating-vote-count">{film.ratingVoteCount}</div>
          </div>
          <div>
            <button
              onClick={(e) => {
                addSelectedFilm(e, film);
              }}
            >
              {" "}
              Добавить в избранное{" "}
            </button>
            {selectedFilms.map(
              (item) =>
                item.kinopoiskId === film.kinopoiskId && (
                  <button
                    key={item.kinopoiskId}
                    onClick={(e) => {
                      addDeleteSelectedFilm(e, film);
                    }}
                  >
                    Удалить из избранного{" "}
                  </button>
                )
            )}
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default React.memo(MoveCard);
