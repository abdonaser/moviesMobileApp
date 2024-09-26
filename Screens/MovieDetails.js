import { useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import movie from "../Styles/MovieStye";
import details from "../Styles/MoviesDetails.js";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavMovie, getAllFavFromFb_Action, puchFavMovie } from '../Redux/Slices/FavMoviesSlice';
import { moviesContext } from '../Context/MoviesContextProvider.js';
import NotFound from '../components/NotFound.js';
import { ActivityIndicator, MD2Colors, useTheme } from 'react-native-paper';

const MovieDetails = () => {
    const { colors } = useTheme();
    const { params: { id } } = useRoute()
    const dispatch = useDispatch()
    const [moviesDetails, setMoviesDetails] = useState({});
    const [moviesDetailsLoading, setMoviesDetailsLoading] = useState(true);
    const [handelFavoriteLoading, setHandelFavoriteLoading] = useState(false);

    const { allMovies, allMoviesLoading, allMoviesError, dispatchAllMovies } =
        useContext(moviesContext);
    const favMovies = useSelector(
        (state) => state.allFavMoviesStore.allFavMovies
    );



    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTRlZjhmNTAzM2FhYTBiM2Y2ODdkM2MxY2Q2OWExNCIsIm5iZiI6MTcyMzc5NjUzNS4zMjY2MTUsInN1YiI6IjY1MWE3ZDMwZDg2MWFmMDBhZTMyMDZiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q6xg2jcA6Qe2KVkOt5l950rfks43jMNXBp6J0aSyJvs'
            }
        };
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(response => {
                setMoviesDetailsLoading(true)
                return response.json()
            }
            )
            .then(response => {
                setMoviesDetailsLoading(false)
                setMoviesDetails(response)

            })
            .catch(err => console.error(err));
    }, []);





    // ! Functions  ====================================
    const handelFavorite = async (movieId) => {
        setHandelFavoriteLoading(true); // Start loading

        const movieSelected = allMovies.results.find((obj) => obj.id === +movieId);
        const moviepressed_Fb_Id = favMovies?.find((obj) => obj.id === +movieId);

        try {
            if (moviepressed_Fb_Id) {
                console.log('Movies/deleteFavMovie > Deleting favorite movie');
                await dispatch(deleteFavMovie(moviepressed_Fb_Id.movieId)); // Delete the movie from Firestore
                console.log('Favorite movie deleted');
            } else {
                // console.log("'Movies/puchFavMovie' > Adding favorite movie");
                await dispatch(puchFavMovie(movieSelected)); // Add the movie to Firestore
                // console.log('Favorite movie added');
            }
            // After either adding or deleting, update the favorites list
            await dispatch(getAllFavFromFb_Action());
        } catch (error) {
            console.error('Error handling favorite movie:', error);
        } finally {
            setHandelFavoriteLoading(false); // Stop loading after operation
        }
    };

    if (moviesDetailsLoading) {
        return <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            style={{ marginTop: 350 }}
        />;
    }

    if (!moviesDetails) {
        return <NotFound />;
    }

    return (
        <>
            <ScrollView style={{ backgroundColor: colors.background }}>
                <View style={[movie.movieCard, details.container]}>

                    <View style={movie.movieCover}>
                        <Image
                            source={{
                                uri: `${moviesDetails.poster_path
                                    ?
                                    `https://image.tmdb.org/t/p/w500${moviesDetails.poster_path}`
                                    :
                                    "https://images.unsplash.com/photo-1721332149371-fa99da451baa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
                                    }`,
                            }}
                            style={{ width: "100%", height: "100%", objectFit: "fill" }}>
                        </Image>
                    </View>

                    <View style={movie.movieTitle}>
                        <Text style={movie.movieTitleTXT}>
                            {moviesDetails.title ?
                                moviesDetails.title
                                :
                                "notFound"
                            }
                        </Text>
                        <Text>
                            {handelFavoriteLoading ?
                                <ActivityIndicator
                                    animating={true}
                                    color={MD2Colors.black}
                                />
                                :
                                <Icon
                                    name="cards-heart"
                                    size={20}
                                    color={favMovies?.find((favobj) => favobj.id === id) ? "red" : "#fff"}
                                    onPress={() => {
                                        handelFavorite(id);
                                    }}
                                >
                                </Icon>
                            }
                        </Text>
                    </View>

                    <View style={details.detailsContainer}>
                        <View style={details.detailsItem}>
                            <Text style={details.detailsItemLeft}>
                                overview :
                            </Text>
                            <Text style={details.detailsItemRightOver} numberOfLines={10} ellipsizeMode="tail">
                                {moviesDetails.overview}
                            </Text>
                        </View>
                        <View style={details.detailsItem}>
                            <Text style={details.detailsItemLeft}>
                                status :
                            </Text>
                            <Text style={details.detailsItemRight} numberOfLines={10} ellipsizeMode="tail">
                                {moviesDetails.status}
                            </Text>
                        </View>
                        <View style={details.detailsItem}>
                            <Text style={details.detailsItemLeft}>
                                vote_average:
                            </Text>
                            <Text style={details.detailsItemRight} numberOfLines={10} ellipsizeMode="tail">
                                {moviesDetails.vote_average}
                            </Text>
                        </View>
                        <View style={details.detailsItem}>
                            <Text style={details.detailsItemLeft}>
                                vote_count:
                            </Text>
                            <Text style={details.detailsItemRight} numberOfLines={10} ellipsizeMode="tail">
                                {moviesDetails.vote_count}
                            </Text>
                        </View>
                    </View>

                </View >
            </ScrollView>
        </>
    );
}
export default MovieDetails;