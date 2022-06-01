 
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountriesGenres,setQueryFilms,setFilmByFilters } from '../redux/toolkitSlice'
import { ratingTest, yearTest, keywordTest } from '../utils/validation'
const Form = ( ) => {
   
    const [country, setCountry] = useState('')
    const [genre, setGenre] = useState('')
    const [typeFilm, setTypeFilm] = useState('')
    const [minRating, setMinRating] = useState('')
    const [maxRating, setMaxRating] = useState('')
    const [yearFrom, setYearFrom] = useState('')
    const [yearTo, setYearTo] = useState('')
    const [keyword, setKeyword] = useState('')
    const [FormValid, setFormValid] = useState(true);
     
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCountriesGenres());

    }, [])
    const countriesGenres = useSelector(state => state.toolkitSlice.countriesGenres)
    const error = useSelector(state => state.toolkitSlice.error)

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = {
            countries: country,
            genres: genre,
            type: typeFilm,
            ratingFrom: minRating,
            ratingTo: maxRating,
            yearFrom,
            yearTo,
            keyword
        }
    
        if (ratingTest(minRating) && ratingTest(maxRating) && yearTest(yearFrom) && yearTest(yearTo) && keywordTest(keyword)) {
            dispatch(setQueryFilms(query))
            dispatch(setFilmByFilters({query,numberPage:1}))
        }
        else {
            setFormValid(false)
        }
    };

    return (<>
       
        <form onSubmit={(e) => handleSubmit(e)} className='form'>
            <label className='m5'>
                Страна
                <select value={country} onChange={(e) => { setCountry(e.target.value) }}  >
                    <option value=""></option>
                    {countriesGenres.countries && countriesGenres.countries.map(item => <option key={item.id} value={item.id} >{item.country}</option>)}
                </select>
            </label>
            <label className='m5'>
                Жанр
                <select value={genre} onChange={(e) => { setGenre(e.target.value) }}   >
                    <option value=""></option>
                    {countriesGenres.genres && countriesGenres.genres.map(item => <option key={item.id} value={item.id} >{item.genre}</option>)}
                </select>
            </label>
            <label className='m5'>
                Тип фильма
                <select value={typeFilm} onChange={(e) => { setTypeFilm(e.target.value) }} >
                    <option value=""></option>
                    <option value="FILM">Фильм</option>
                    <option value="TV_SHOW">ТВ Шоу</option>
                    <option value="TV_SERIES">Сериал</option>
                    <option value="MINI_SERIES">Мини сериал</option>
                    <option value="ALL">Любой</option>
                </select>
            </label>

            <input className='m5' type="text" placeholder="мин рейтинг:0" value={minRating} onChange={(e) => { setMinRating(e.target.value) }} />

            <input className='m5'   type="text" placeholder="max рейтинг:10" value={maxRating} onChange={(e) => { setMaxRating(e.target.value) }} />

            <input className='m5' type="text" placeholder="мин год:1000" value={yearFrom} onChange={(e) => { setYearFrom(e.target.value) }} />

            <input className='m5' type="text" placeholder="макс год:3000" value={yearTo} onChange={(e) => { setYearTo(e.target.value) }} />

            <input className='m5' type="text" placeholder="Ключевое слово" value={keyword} onChange={(e) => { setKeyword(e.target.value) }} />

            <button className='m5' >Поиск</button>
            {!FormValid && "Не валидная форма"}


        </form>
        {error&&<h1>{error}</h1>}
        {/* {FormValid && <Navigate to="/More" replace={true} />} */}
    </>


    )
};

export default Form;
 
