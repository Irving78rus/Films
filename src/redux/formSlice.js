import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  getCountriesGenres,
  getFilmByFilters,
} from "../api/api";
import { renameResponse } from "../utils/logic";

export const setCountriesGenres = createAsyncThunk(

  "toolkit/setCountriesGenres",
  async () => {
    const response = await getCountriesGenres();
    return response;
  }
);
export const setFilmByFilters = createAsyncThunk(
  "toolkit/setFilmByFilters",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getFilmByFilters(data);
      if (!response) {
        throw new Error('Server Error')
      }
      return renameResponse(response, response.items, "ratingKinopoisk", "rating")

    } catch (error) {
      return rejectWithValue(error.message)
    }

  }
);


const formSlice = createSlice({
  name: "formSlice",
  initialState: {

    countriesGenres: {},
    FilmByFilters: [],
    isPreloader: false,
    queryFilms: {
      countries: '',
      genres: '',
      type: '',
      ratingFrom: '',
      ratingTo: '',
      yearFrom: '',
      yearTo: '',
      keyword: ''
    },
    error: null
  },
  reducers: {

    setQueryFilms(state, query) {
      state.queryFilms = query.payload;
    },
  },



  extraReducers: (builder) => {
    //Не нравится мне это, очень код однообразный
    builder.addCase(setCountriesGenres.fulfilled, (state, action) => {
      state.isPreloader = false;
      state.countriesGenres = action.payload;
    });
    builder.addCase(setFilmByFilters.pending, (state, action) => {
      state.isPreloader = true;
    });
    builder.addCase(setFilmByFilters.fulfilled, (state, action) => {
      state.isPreloader = false;
      state.FilmByFilters = action.payload;
      state.error = null;
    });
    builder.addCase(setFilmByFilters.rejected, (state, action) => {
      state.isPreloader = false;
      state.error = action.payload;
    });

  },
});

export const { setQueryFilms } = formSlice.actions;
export default formSlice.reducer;