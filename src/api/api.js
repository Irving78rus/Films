 
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
export const getTop250 = (numberPage=5) => {
  
  return instance
    .get(`api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${numberPage}`)
    .then((response) => response.data);
};
export const getPremieres = (numberPage=5) => {
  return instance
    .get(`api/v2.2/films/premieres?year=2022&month=JANUARY&page=${numberPage}`)
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

export const getFilmByFilters = (query,numberPage=1) => {
  return instance
    .get(
      `api/v2.2/films?countries=${query.countries}&genres=${query.genres}&type=${query.type}&ratingFrom=${query.ratingFrom}&ratingTo=${query.ratingTo}&yearFrom=${query.yearFrom}&yearTo=${query.yearTo}&keyword=${query.keyword}&page=${numberPage}`
    )
    .then((response) => response.data);
};
 