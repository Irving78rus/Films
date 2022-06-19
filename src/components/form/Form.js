import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountriesGenres,
  setQueryFilms,
  setFilmByFilters,
} from "../../redux/formSlice";
import "./form.css";
import { ratingTest, yearTest, keywordTest } from "../../utils/validation";
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

  const countryValue = countriesGenres.countries?.map((item) => item.country);
  const countryId = countriesGenres.countries?.find((item) => item.country === country);
  const genreValue = countriesGenres.genres?.map((item) => item.genre);
  const genreId = countriesGenres.genres?.find((item) => item.genre === genre);
  useEffect(() => {
    countryId && setCountry(countryId.id)
  }, [country]);
  useEffect(() => {
    genreId && setGenre(genreId.id)
  }, [genre]);

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

        <div>Страна</div>
   
        <Select className="m5" items={countryValue} onValueChange={setCountry} search />
       
        <div>Жанр</div>
        <Select className="m5" items={genreValue} onValueChange={setGenre} search />
      
        <div> Тип фильма</div>
        <Select className="m5" items={typeFilmValue} onValueChange={setTypeFilm} search />
      
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
