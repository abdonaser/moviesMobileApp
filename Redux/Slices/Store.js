import { configureStore } from "@reduxjs/toolkit";
import FavMoviesSlice from "./FavMoviesSlice";

const store = configureStore({
    reducer: {
        allFavMoviesStore: FavMoviesSlice,
    }
})
export default store;  