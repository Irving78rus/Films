 
import { createSlice, createAsyncThunk,current } from "@reduxjs/toolkit";
import {
  getTop250,
  getPremieres,
  getFilmById,
  getCountriesGenres,
  getFilmByFilters,
} from "../api/api";
 
 

export const setTop250 = createAsyncThunk("toolkit/setTop250", async (data) => {
   
  const response = await getTop250(data);
  

  const arr = [];
  response.films.map((item, index) => {
    let clone = {};
    for (let key in item) {
      if (key === "filmId") {
        clone["kinopoiskId"] = item[key];
      } else {
        clone[key] = item[key];
      }
    }
    arr.push(clone);
  });
  const myResponse = {
    total: response.pagesCount,
    items: arr
  }
  return myResponse;
});
export const setPremieres = createAsyncThunk(
  "toolkit/setPremieres",
  async (numberPage) => {
    const response = await getPremieres(numberPage);

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
export const setCountriesGenres = createAsyncThunk(
  "toolkit/setCountriesGenres",
  async () => {
    const response = await getCountriesGenres();

    return response;
  }
);
export const setFilmByFilters = createAsyncThunk(
  "toolkit/setFilmByFilters",
  async (data) => {
    
    const response = await getFilmByFilters(data);
   
    const arr = [];
    response.items.map((item, index) => {
      let clone = {};
      for (let key in item) {
        if (key === "ratingKinopoisk") {
          clone["rating"] = item[key];
        } else {
          clone[key] = item[key];
        }
      }
      arr.push(clone)
    })
    const myResponse = {
      total: response.totalPages,
      items: arr
    }
    return myResponse;
  }

);



const toolkitSlice = createSlice({
  name: "toolkit",
  initialState: {
    top250: {},
    awaitFilms: {},
    //ыфбор фильма это массив а нужен обхект
    selectedFilm: {
        total: 0,
      items: []
    },
    filmById: {},
    countriesGenres: {},
    FilmByFilters: [],
    isPreloader: false,
    queryFilms:{}
  },
  reducers: {
    setSelectedFilm(state, id) {
      if (
        state.selectedFilm.items.every(
          (item) => item.kinopoiskId !== id.payload.kinopoiskId
        )
      ) {
        state.selectedFilm.items.push(id.payload);
        //  state.selectedFilm.total++
      }
    },
    setQueryFilms(state,query){
      state.queryFilms=query.payload
       
    }

  },

  extraReducers: (builder) => {
    builder.addCase(setTop250.fulfilled, (state, action) => {
      state.isPreloader = false
      state.top250 = action.payload;
    });
    builder.addCase(setPremieres.fulfilled, (state, action) => {
      state.isPreloader = false
      state.awaitFilms = action.payload;
    });
    builder.addCase(setFilmById.fulfilled, (state, action) => {
      state.isPreloader = false
      state.filmById = action.payload;
    });
    builder.addCase(setCountriesGenres.fulfilled, (state, action) => {
      state.isPreloader = false
      state.countriesGenres = action.payload;
    });
    builder.addCase(setFilmByFilters.pending, (state, action) => {
    
      state.isPreloader = true
    });
    builder.addCase(setFilmByFilters.fulfilled, (state, action) => {
      state.isPreloader = false
      state.FilmByFilters = action.payload;
    });
  },
});

export const { setSelectedFilm,setQueryFilms } = toolkitSlice.actions;
export default toolkitSlice.reducer;
 
