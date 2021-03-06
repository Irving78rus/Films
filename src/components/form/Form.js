import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountriesGenres,
  setQueryFilms,
  setFilmByFilters,
  errorNull
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
  error&&dispatch(errorNull());
  
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

        <div>????????????</div>
   
        <Select className="m5" items={countryValue} onValueChange={setCountry} search />
       
        <div>????????</div>
        <Select className="m5" items={genreValue} onValueChange={setGenre} search />
      
        <div> ?????? ????????????</div>
        <Select className="m5" items={typeFilmValue} onValueChange={setTypeFilm} search />
      
        <Input
          className="m5"
          placeholder="?????? ??????????????:0"
          value={minRating}
          onChange={(e) => {
            setMinRating(e.target.value);
          }}
        />
        <Input
          className="m5"
          placeholder="max ??????????????:10"
          value={maxRating}
          onChange={(e) => {
            setMaxRating(e.target.value);
          }}
        />

        <Input
          className="m5"
          placeholder="?????? ??????:1000"
          value={yearFrom}
          onChange={(e) => {
            setYearFrom(e.target.value);
          }}
        />

        <Input
          className="m5"
          placeholder="???????? ??????:3000"
          value={yearTo}
          onChange={(e) => {
            setYearTo(e.target.value);
          }}
        />
        <Input
          className="m5"
          placeholder="???????????????? ??????????"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        {/* <input className='m5' type="text" placeholder="?????? ??????????????:0" value={minRating} onChange={(e) => { setMinRating(e.target.value) }} />
        <input className='m5'   type="text" placeholder="max ??????????????:10" value={maxRating} onChange={(e) => { setMaxRating(e.target.value) }} />
        <input className='m5' type="text" placeholder="?????? ??????:1000" value={yearFrom} onChange={(e) => { setYearFrom(e.target.value) }} />
        <input className='m5' type="text" placeholder="???????? ??????:3000" value={yearTo} onChange={(e) => { setYearTo(e.target.value) }} />
        <input className='m5' type="text" placeholder="???????????????? ??????????" value={keyword} onChange={(e) => { setKeyword(e.target.value) }} /> */}

        <button className='m5' type="">??????????</button>
        {/* <Button className='m5' >??????????</Button> */}
        {!FormValid && "???? ???????????????? ??????????"}
      </form>
      {error && <h1>{error}</h1>}

    </>
  );
};

export default Form;
