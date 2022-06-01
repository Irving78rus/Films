import "../App.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilmById, setSelectedFilm } from '../redux/toolkitSlice'
function InfoAboutFilm() {
    const { id } = useParams()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setFilmById(id));
    }, [])
    const filmById = useSelector((state) => state.toolkitSlice.filmById);

    const addSelectedFilm = () => {
        dispatch(setSelectedFilm(filmById))
    }

    return (<div className="top250Wrapper" >

        {filmById.year && <div className="InfoAboutFilm" style={{ backgroundImage: `url(${filmById.coverUrl})` }} >
            <div className="InfoAboutFilmFon"  >
                <div className="InfoAboutFilmLeft" >
                    <img src={filmById.posterUrlPreview} />
                    
                </div>
                <div className="InfoAboutFilmCenter" >
                    {/* {копипаста!!!!} */}
                    {/* {копипаста!!!!} */}
                    {/* {копипаста!!!!} */}
                    {/* {копипаста!!!!} */}
                    <div className="InfoAboutFilmCenterNameRu"> {filmById.nameRu}  ({filmById.year})</div>
                    <div className="InfoAboutFilmCenterNameOriginal"> {filmById.nameOriginal} {filmById.ratingAgeLimits && filmById.ratingAgeLimits.replace(/[^0-9]/g, "")}+</div>
                    <div className="InfoAboutFilmCenterShortDescription" >Описание {filmById.shortDescription}</div>
                    <div className="InfoAboutFilmCenterNameOriginal">продолжительность<span className="InfoAboutFilmSpan" >{filmById.filmLength} мин</span></div>
                    <button onClick={addSelectedFilm}>Добавить в избранное</button>
                    <div className="InfoAboutFilmCenterNameOriginal"> Возрасть <span className="InfoAboutFilmSpan"> {filmById.ratingAgeLimits && filmById.ratingAgeLimits.replace(/[^0-9]/g, "")}+</span></div>
                    <div className="InfoAboutFilmCenterNameOriginal">год производства<span className="InfoAboutFilmSpan" > {filmById.year}</span></div>
                    <div className="InfoAboutFilmCenterNameOriginal">Страна<span className="InfoAboutFilmSpan" > {filmById?.countries[0].country}</span></div>
                    <div className="InfoAboutFilmCenterNameOriginal">Жанр <span className="InfoAboutFilmSpan" > {filmById.genres.map((genre, index) => <span key={index}>{genre.genre + `, `}</span>)}</span></div>
                    <div className="InfoAboutFilmCenterNameOriginal">Слоган<span className="InfoAboutFilmSpan" >{filmById.slogan}</span></div>
                </div>
                <div className="InfoAboutFilmRight" > </div>
            </div>
        </div>}
    </div>
    )
}

export default InfoAboutFilm