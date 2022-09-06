import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getTop250, getPremieres, getFilmById } from "../api/api";
import { renameResponse } from "../utils/logic";

export const setTop250 = createAsyncThunk(
  "toolkit/setTop250",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTop250(data);

      if (!response) {
        throw new Error("Server Error");
      }
      return renameResponse(response, response.films, "filmId", "kinopoiskId");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setPremieres = createAsyncThunk(
  "toolkit/setPremieres",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getPremieres(data);

      if (!response) {
        throw new Error("Server Error");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setFilmById = createAsyncThunk(
  "toolkit/setFilmById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getFilmById(id);

      if (!response) {
        throw new Error("Server Error");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const filmContentSlice = createSlice({
  name: "filmContentSlice",
  initialState: {
    isPreloader: false,
    top250: {},
    awaitFilms: {},
    selectedFilm: {
      total: 0,
      items: [],
    },
    filmById: {},
    error: null,
  },
  reducers: {
    setSelectedFilm(state, film) {
      if (
        state.selectedFilm.items.every(
          (item) => item.kinopoiskId !== film.payload.kinopoiskId
        )
      ) {
        state.selectedFilm.items.push(film.payload);
      }
    },
    deleteSelectedFilm(state, film) {
      state.selectedFilm.items = state.selectedFilm.items.filter(
        (item) => item.kinopoiskId !== film.payload.kinopoiskId
      );
    },
    errorNull(state ){
        state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(setTop250.fulfilled, (state, action) => {
      state.isPreloader = false;
      state.top250 = action.payload;
      
    });
    builder.addCase(setTop250.pending, (state, action) => {
      state.isPreloader = true;
       
    });
    builder.addCase(setTop250.rejected, (state, action) => {
      state.isPreloader = false;
      state.error = action.payload;
    });

    builder.addCase(setPremieres.fulfilled, (state, action) => {
      state.isPreloader = false;
      state.awaitFilms = action.payload;
      
    });
    builder.addCase(setPremieres.pending, (state, action) => {
      state.isPreloader = true;
       
    });
    builder.addCase(setPremieres.rejected, (state, action) => {
      state.isPreloader = false;
      state.error = action.payload;
    });

    builder.addCase(setFilmById.fulfilled, (state, action) => {
      state.isPreloader = false;
      state.filmById = action.payload;
      
    });
    builder.addCase(setFilmById.pending, (state, action) => {
      state.isPreloader = true;
      
    });
    builder.addCase(setFilmById.rejected, (state, action) => {
      state.isPreloader = false;
      state.error = action.payload;
    });
  },
});

export const { setSelectedFilm, deleteSelectedFilm,errorNull } = filmContentSlice.actions;
export default filmContentSlice.reducer;
