import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { db } from "../../app/helpers/firebaseConfig";
// import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../app/Helpers/firebaseConfig";
import { useDispatch } from "react-redux";


export const getAllFavFromFb_Action = createAsyncThunk("favMovies/getFavMovies",
    async () => {
        try {
            const queryOutPut = await getDocs(collection(db, "favoriteMovies"));
            const favMoviesFbList = queryOutPut.docs.map((doc) => ({ ...doc.data(), movieId: doc.id }));
            // console.log("getAllFavFromFb_Action success From 'FavMoviesSlice' ", favMoviesFbList.length);
            return favMoviesFbList
        } catch (error) {
            console.log("Error fetching getAllFavFromFb_Action: ", error);
        }
    }
)

const FavMoviesSlice = createSlice({
    name: "favouriteMovies",

    initialState: { allFavMovies: [], favMovieslength: 0, FavIsloading: true, FavIsError: true },

    reducers: {
        allFavMoviesFromFb: (state, action) => {
            state.allFavMovies = action.payload
        },

        puchFavMovie: (state, action) => {
            // state.allFavMovies = [...state.allFavMovies, action.payload]
            // state.favMovieslength = state.allFavMoviesfetchFavMoviesFrom_Fb.length;
            addFavToFb(action.payload)
        },

        deleteFavMovie: (state, action) => {
            // const filterAllFavMovies = state.allFavMovies.filter((filterobj) => filterobj.id !== action.payload.id)
            // state.allFavMovies = filterAllFavMovies
            // state.favMovieslength = state.allFavMovies.length
            DeleteFavFromFb(action.payload)
        },
    },

    extraReducers: (builder) => {
        //' in successful response
        builder.addCase(
            getAllFavFromFb_Action.fulfilled, (state, action) => {
                // console.log("state.allFavMovies -=> "  , state.allFavMovies);
                state.allFavMovies = action.payload
                state.favMovieslength = action.payload.length
                state.FavIsloading = false
                state.FavIsError = false
            }
        )
        //' in rejected response
        builder.addCase(
            getAllFavFromFb_Action.rejected, (state, action) => {
                state.allFavMovies = action.payload
                state.FavIsloading = false
                state.FavIsError = true
            }
        )
        //' in pending response "you data in way"
        builder.addCase(
            getAllFavFromFb_Action.pending, (state, action) => {
                state.FavIsloading = true
            }
        )
    }
})


//' add movie to cloud FireStore
const addFavToFb = async (favMoviesFb) => {
    try {
        const docRef = await addDoc(collection(db, "favoriteMovies"), {
            ...favMoviesFb
        });
        // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.log("someThing wrong in adding to Fb ", error);
    }
}

//' Delete movie From cloud FireStore
const DeleteFavFromFb = async (movieId) => {
    try {
        //' create reference to the movie i want to delete
        const movieRef = doc(db, "favoriteMovies", movieId)
        //' deletethe movie
        await deleteDoc(movieRef)
        // console.log("delete success", movieId);
    } catch (error) {
        console.log("someThing wrong in deleting from Fb ", movieRef);
    }
}


export const { puchFavMovie, deleteFavMovie, allFavMoviesFromFb } = FavMoviesSlice.actions
export default FavMoviesSlice.reducer
