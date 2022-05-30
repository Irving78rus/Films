import toolkitSlice from "./toolkitSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  toolkitSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
