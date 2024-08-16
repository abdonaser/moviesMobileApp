import React from 'react';


const GetMoviesReducer = (state, action) => {

    switch (action.type) {
        case "getAllMovies":
            return action.payload
            break;
        case "Filtration":
            return action.payload
            break;
        default:
            break;
    }

    return state;
}


export default GetMoviesReducer;
