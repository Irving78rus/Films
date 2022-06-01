 
import axios from "axios";
  const instance = axios.create({

  headers: {
    "Content-Type":"application/json",
    "X-API-KEY": "9b1b63e9-aef3-41ca-b7ff-9bd8eb2de6b7"
  },
  baseURL: "https://kinopoiskapiunofficial.tech/"
})

// const instance = axios.create({
//   headers: {
//     "Content-Type": "application/json",
//     "X-API-KEY": "0425614e-cca1-4697-ba99-70adf7121540",
//   },
//   baseURL: "https://kinopoiskapiunofficial.tech/",
// });
export const getTop250 = (data) => {
  
  return instance
    .get(`api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${data.numberPage}`)
    .then((response) => response.data);
};
export const getPremieres = ( ) => {
  return instance
    .get(`api/v2.2/films/premieres?year=2022&month=JANUARY&`)
    .then((response) => response.data);
};
export const getFilmById = (id) => {
  return instance.get(`api/v2.2/films/${id}`).then((response) => response.data);
};

export const getCountriesGenres = () => {
  return instance
    .get(`api/v2.2/films/filters`)
    .then((response) => response.data);
};

export const getFilmByFilters = (data ) => {
  console.log(data);
  return instance
    .get(
      `api/v2.2/films?countries=${data.query.countries}&genres=${data.query.genres}&type=${data.query.type}&ratingFrom=${data.query.ratingFrom}&ratingTo=${data.query.ratingTo}&yearFrom=${data.query.yearFrom}&yearTo=${data.query.yearTo}&keyword=${data.query.keyword}&page=${data.numberPage}`
    )
    .then((response) => response.data);
};
 