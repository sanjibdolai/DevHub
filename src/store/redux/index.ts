import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import modalSlice from "./slices/modalSlice";
import { developersApi } from "../api/developersApi";
import { blogsApi } from "../api/blogsApi";

export const reducers = combineReducers({
  theme: themeSlice,
  modal: modalSlice,
  [developersApi.reducerPath]: developersApi.reducer,
  [blogsApi.reducerPath]: blogsApi.reducer,
});

// Export the root reducer
export default reducers;

// Define and export the RootState type
export type GlobalState = ReturnType<typeof reducers>;
