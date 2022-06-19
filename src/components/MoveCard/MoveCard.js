import "./MoveCard.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilm, deleteSelectedFilm } from "../../redux/toolkitSlice";

function MoveCard({ listFilms }) {
  const dispatch = useDispatch();
  const selectedFilms = useSelector(
    (state) => state.toolkitSlice.selectedFilm.items
  );
  const addSelectedFilm = (e, film) => {
    dispatch(setSelectedFilm(film));
    e.preventDefault();
  };
  const addDeleteSelectedFilm = (e, film) => {
    e.preventDefault();
    dispatch(deleteSelectedFilm(film));
  };
  const error = useSelector((state) => state.toolkitSlice.error);
  return (
    <div className="wrapper">
      {error && <h1>{error}</h1>}
      {listFilms.items?.map((film, index) => (
        <NavLink
          to={`/Films/${film.kinopoiskId}`}
          key={index}
          className={index === 0 ? " bc" : "filmList"}
        >
          <div> {index + 1}</div>
          <div className="posterUrlPreview">
            <img src={film.posterUrlPreview} alt="" />
            <div
              className="ratingOnCard"
              style={
                film.rating && film.rating < 6
                  ? { backgroundColor: "red" }
                  : null
              }
            >
              {film.rating}
            </div>
          </div>
          <div className="filmInfo">
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
          <div className="ratingInfo">
            <div
              className="rating"
              style={
                film.rating && film.rating > 6 ? { color: "#3bb33b" } : null
              }
            >
              {film.rating}
            </div>
            <div className="ratingVoteCount">{film.ratingVoteCount}</div>
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
