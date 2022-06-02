import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountriesGenres,
  setQueryFilms,
  setFilmByFilters,
} from "../redux/formSlice";
import { ratingTest, yearTest, keywordTest } from "../utils/validation";
import { Input, Button, Select } from "@skbkontur/react-ui";
const Form = () => {
  const typeFilmValue = [
    "FILM",
    "TV_SHOW",
    "TV_SERIES",
    Select.SEP,
    "MINI_SERIES",
    "ALL",
  ];
 
  const [country, setCountry] = useState("1");
  const [genre, setGenre] = useState("13");
  const [typeFilm, setTypeFilm] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [keyword, setKeyword] = useState("");
  const [FormValid, setFormValid] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCountriesGenres());
  }, []);
  const countriesGenres = useSelector(
    (state) => state.formSlice.countriesGenres
  );
  const error = useSelector((state) => state.formSlice.error);
  
  const countryValue  = countriesGenres.countries?.map((item) => item.country);
  const countryId  =  countriesGenres.countries?.find((item) => item.country===country);
  countryId&&setCountry(countryId.id)

  const genreValue  = countriesGenres.genres?.map((item) => item.genre);
  const genreId  = countriesGenres.genres?.find((item) => item.genre===genre);
  genreId&&setGenre(genreId.id)

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
      keyword,
    };
    console.log(query);
    if (
      ratingTest(minRating) &&
      ratingTest(maxRating) &&
      yearTest(yearFrom) &&
      yearTest(yearTo) &&
      keywordTest(keyword)
    ) {
      dispatch(setQueryFilms(query));
      dispatch(setFilmByFilters({ query, numberPage: 1 }));
    } else {
      setFormValid(false);
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <label >
           <div>Страна</div>
           <Select className="m5" items={countryValue} onValueChange={ setCountry } search />    
            {/* <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            <option value=""></option>
            {countriesGenres.countries &&
              countriesGenres.countries.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.country}
                </option>
              ))}
          </select>   */}
        </label>
        <label  >
          <div>Жанр</div>
          <Select className="m5" items={genreValue} onValueChange={setGenre} search />
          {/* <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option value=""></option>
            {countriesGenres.genres &&
              countriesGenres.genres.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.genre}
                </option>
              ))}
          </select> */}
        </label>
        <label >
          <div> Тип фильма</div>
          <Select className="m5" items={typeFilmValue}   onValueChange={setTypeFilm} search />
          {/* <select
            value={typeFilm}
            onChange={(e) => {
              setTypeFilm(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="FILM">Фильм</option>
            <option value="TV_SHOW">ТВ Шоу</option>
            <option value="TV_SERIES">Сериал</option>
            <option value="MINI_SERIES">Мини сериал</option>
            <option value="ALL">Любой</option>
          </select> */}
        </label>

        <Input
          className="m5"
          placeholder="мин рейтинг:0"
          value={minRating}
          onChange={(e) => {
            setMinRating(e.target.value);
          }}
        />
        <Input
          className="m5"
          placeholder="max рейтинг:10"
          value={maxRating}
          onChange={(e) => {
            setMaxRating(e.target.value);
          }}
        />

        <Input
          className="m5"
          placeholder="мин год:1000"
          value={yearFrom}
          onChange={(e) => {
            setYearFrom(e.target.value);
          }}
        />

        <Input
          className="m5"
          placeholder="макс год:3000"
          value={yearTo}
          onChange={(e) => {
            setYearTo(e.target.value);
          }}
        />
        <Input
          className="m5"
          placeholder="Ключевое слово"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        {/* <input className='m5' type="text" placeholder="мин рейтинг:0" value={minRating} onChange={(e) => { setMinRating(e.target.value) }} />
        <input className='m5'   type="text" placeholder="max рейтинг:10" value={maxRating} onChange={(e) => { setMaxRating(e.target.value) }} />
        <input className='m5' type="text" placeholder="мин год:1000" value={yearFrom} onChange={(e) => { setYearFrom(e.target.value) }} />
        <input className='m5' type="text" placeholder="макс год:3000" value={yearTo} onChange={(e) => { setYearTo(e.target.value) }} />
        <input className='m5' type="text" placeholder="Ключевое слово" value={keyword} onChange={(e) => { setKeyword(e.target.value) }} /> */}
                
        <button className='m5' type="">Поиск</button>
        {/* <Button className='m5' >Поиск</Button> */}
        {!FormValid && "Не валидная форма"}
      </form>
      {error && <h1>{error}</h1>}
      
    </>
  );
};

export default Form;
