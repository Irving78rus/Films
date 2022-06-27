import axios from "axios";
const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "9b1b63e9-aef3-41ca-b7ff-9bd8eb2de6b7",
  },
  baseURL: "https://kinopoiskapiunofficial.tech/",
});

export const getTop250 = async (data) => {
  const response = await instance.get(
    `api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${data.numberPage}`
  );

  return response.data;
};
export const getPremieres = async () => {
  const response = await instance.get(
    `api/v2.2/films/premieres?year=2022&month=JANUARY&`
  );
  return response.data;
};
export const getFilmById = async (id) => {
  const response = await instance.get(`api/v2.2/films/${id}`);
  return response.data;
};

export const getCountriesGenres = async () => {
  const response = await instance.get(`api/v2.2/films/filters`);
  return response.data;
};

export const getFilmByFilters = async (data) => {
  const response = await instance.get(
    `api/v2.2/films?countries=${data.query.countries}&genres=${data.query.genres}&type=${data.query.type}&ratingFrom=${data.query.ratingFrom}&ratingTo=${data.query.ratingTo}&yearFrom=${data.query.yearFrom}&yearTo=${data.query.yearTo}&keyword=${data.query.keyword}&page=${data.numberPage}`
  );
  return response;
};
