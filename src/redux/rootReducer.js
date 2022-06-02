import toolkitSlice from "./toolkitSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import formSlice from "./formSlice";
const rootReducer = combineReducers({
  toolkitSlice,
  formSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
