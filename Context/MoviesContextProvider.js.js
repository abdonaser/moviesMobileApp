import { createContext, useEffect, useReducer, useState } from "react";
import GetMoviesReducer from "../Reducers/getMoviesReducer";
import useAxios from "axios-hooks";


export const moviesContext = createContext()

const MoviesContextProvider = ({ children }) => {

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         accept: 'application/json',
    //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTRlZjhmNTAzM2FhYTBiM2Y2ODdkM2MxY2Q2OWExNCIsIm5iZiI6MTcyMzc5NjUzNS4zMjY2MTUsInN1YiI6IjY1MWE3ZDMwZDg2MWFmMDBhZTMyMDZiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q6xg2jcA6Qe2KVkOt5l950rfks43jMNXBp6J0aSyJvs'
    //     }
    // };



    const [allMovies, dispatchAllMovies] = useReducer(GetMoviesReducer, [])

    const [{ data, loading: allMoviesLoading, error: allMoviesError }] = useAxios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/trending/all/day?language=en-US',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTRlZjhmNTAzM2FhYTBiM2Y2ODdkM2MxY2Q2OWExNCIsIm5iZiI6MTcyMzc5NjUzNS4zMjY2MTUsInN1YiI6IjY1MWE3ZDMwZDg2MWFmMDBhZTMyMDZiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q6xg2jcA6Qe2KVkOt5l950rfks43jMNXBp6J0aSyJvs'
        }
    });


    useEffect(() => {
        dispatchAllMovies({ type: "getAllMovies", payload: data })
    }, [data]);

    //  ! calling with fetch=====================================================================
    // const [allMovies, setAllMovies] = useState([])
    // const [allMoviesLoading, setAllMoviesLoading] = useState(false)
    // const [allMoviesError, setAllMoviesError] = useState(false)

    // useEffect(() => {
    //     fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
    //         .then((response) => {
    //             setAllMoviesLoading(true)
    //             return response.json()
    //         })
    //         .then(response => {
    //             setAllMovies(response)
    //             console.log(response);
    //             setAllMoviesLoading(false)
    //         })
    //         .catch(err => setAllMoviesError(err));
    // }, [])
    //  ! Endh=====================================================================



    // { allMovies, dispatchAllMovies, allMoviesLoading, allMoviesError }

    return (
        <moviesContext.Provider value={
            {
                allMovies,
                dispatchAllMovies,
                allMoviesLoading,
                allMoviesError
            }
        }>
            {children}
        </moviesContext.Provider>


        // < moviesContext.Provider value={{ allMovies, allMoviesLoading, allMoviesError }}>
        //     {children}
        // </moviesContext.Provider>
    )
}

export default MoviesContextProvider;