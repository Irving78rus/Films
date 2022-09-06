import "./InfoAboutFilm.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilmById, setSelectedFilm } from "../../redux/filmContentSlice";
function InfoAboutFilm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFilmById(id));
  }, []);
  const filmById = useSelector((state) => state.filmContentSlice.filmById);

  const addSelectedFilm = () => {
    dispatch(setSelectedFilm(filmById));
  };

  return (
    <div className="wrapper">
      {filmById.year && (
        <div
          className="InfoAboutFilm"
          style={{ backgroundImage: `url(${filmById.coverUrl})` }}
        >
          <div className="InfoAboutFilmFon">
            <div className="InfoAboutFilmLeft">
              <img src={filmById.posterUrlPreview} alt="poster" />
            </div>
            <div className="InfoAboutFilmCenter">
              {/* {копипаста!!!!} */}
              <div className="InfoAboutFilmCenterNameRu">
                {" "}
                {filmById.nameRu} ({filmById.year})
              </div>
              <div className="description">
                {" "}
                {filmById.nameOriginal}{" "}
                {filmById.ratingAgeLimits &&
                  filmById.ratingAgeLimits.replace(/[^0-9]/g, "")}
                +
              </div>
              <div className="InfoAboutFilmCenterShortDescription">
                Описание {filmById.shortDescription}
              </div>
              <div className="description">
                продолжительность {" "}
                <span className="descriptionValue">
                  {filmById.filmLength} мин
                </span>
              </div>
              <div className="description">
                Возраст {" "}
                <span className="descriptionValue">
                  {filmById.ratingAgeLimits &&
                    filmById.ratingAgeLimits.replace(/[^0-9]/g, "")}
                  +
                </span>
              </div>
              <div className="description">
                Год производства {" "}
                <span className="descriptionValue">{filmById.year}</span>
              </div>
              <div className="description">
                Страна {" "}
                <span className="descriptionValue">
                  {filmById?.countries[0].country}
                </span>
              </div>
              <div className="description">
                Жанр {" "}
                <span className="descriptionValue">
                  {filmById.genres.map((genre, index) => (
                    <span key={index}>{genre.genre + `, `}</span>
                  ))}
                </span>
              </div>
              <div className="description">
                Слоган {" "}
                <span className="descriptionValue">{filmById.slogan}</span>
              </div>
              <button onClick={addSelectedFilm}>Добавить в избранное</button>
            </div>
            <div className="InfoAboutFilmRight"> </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoAboutFilm;
