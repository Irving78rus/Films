import filmContentSlice from "./filmContentSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import formSlice from "./formSlice";
const rootReducer = combineReducers({
  filmContentSlice,
  formSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
