import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  getTop250,
  getPremieres,
  getFilmById,
  
   
} from "../api/api";
import { renameResponse } from "../utils/logic";

export const setTop250 = createAsyncThunk("toolkit/setTop250", async (data) => {
  const response = await getTop250(data);
  return renameResponse(response, response.films, "filmId", "kinopoiskId");
});
export const setPremieres = createAsyncThunk(
  "toolkit/setPremieres",
  async (data) => {
    const response = await getPremieres(data);
    return response;
  }
);

export const setFilmById = createAsyncThunk(
  "toolkit/setFilmById",
  async (id) => {
    const response = await getFilmById(id);
    return response;
  }
);

 


const toolkitSlice = createSlice({
  name: "toolkit",
  initialState: {
    top250: {},
    awaitFilms: {},
    selectedFilm: {
      total: 0,
      items: [],
    },
    filmById: {},
     
  },
  reducers: {
    setSelectedFilm(state, film) {
      if (state.selectedFilm.items.every(
        (item) => item.kinopoiskId !== film.payload.kinopoiskId)) {
        state.selectedFilm.items.push(film.payload);
      }
    },
    deleteSelectedFilm(state, film) {
      state.selectedFilm.items = state.selectedFilm.items.filter(
        (item) => item.kinopoiskId !== film.payload.kinopoiskId
      );
    },

    
  },



  extraReducers: (builder) => {
    //Не нравится мне это, очень код однообразный
    builder.addCase(setTop250.fulfilled, (state, action) => {
      state.isPreloader = false;
      state.top250 = action.payload;
    });
    builder.addCase(setPremieres.fulfilled, (state, action) => {
      state.isPreloader = false;
      state.awaitFilms = action.payload;
    });
    builder.addCase(setFilmById.fulfilled, (state, action) => {
      state.isPreloader = false;
      state.filmById = action.payload;
    });
   
     
  },
});

export const { setSelectedFilm,  deleteSelectedFilm } =
  toolkitSlice.actions;
export default toolkitSlice.reducer;
