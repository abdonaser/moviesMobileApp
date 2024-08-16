import { createSlice } from "@reduxjs/toolkit";

const FavMoviesSlice = createSlice({
    name: "favouriteMovies",
    initialState: { allFavMovies: [], favMovieslength: 0 },
    reducers: {
        puchFavMovie: (state, action) => {
            state.allFavMovies = [...state.allFavMovies, action.payload]
            state.favMovieslength = state.allFavMovies.length
        },
        deleteFavMovie: (state, action) => {
            const filterAllFavMovies = state.allFavMovies.filter((filterobj) => filterobj.id !== action.payload.id)
            state.allFavMovies = filterAllFavMovies
            state.favMovieslength = state.allFavMovies.length
        },
    }
})

export const { puchFavMovie, deleteFavMovie } = FavMoviesSlice.actions
export default FavMoviesSlice.reducer