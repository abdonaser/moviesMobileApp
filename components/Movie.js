import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import movie from "../Styles/MovieStye";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { moviesContext } from "../Context/MoviesContextProvider.js";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavMovie, puchFavMovie } from "../Redux/Slices/FavMoviesSlice.js";
import { useNavigation } from "@react-navigation/native";
import Routes from "../Utils/MyRoutes.js";

const Movie = ({ title, movieImgSrc, id }) => {
    const { navigate } = useNavigation();
    const favMovies = useSelector(
        (state) => state.allFavMoviesStore.allFavMovies
    );
    const displispatch = useDispatch()
    const { allMovies, allMoviesLoading, allMoviesError, dispatchAllMovies } =
        useContext(moviesContext);
    const handelFavorite = (movieId) => {
        if (favMovies.find((obj) => obj.id === +movieId)) {
            const movieSelected = allMovies.results.find((obj) => {
                return obj.id === +id;
            });
            displispatch(deleteFavMovie(movieSelected));
        } else {
            const movieSelected = allMovies.results.find((obj) => {
                return obj.id === +id;
            });
            displispatch(puchFavMovie(movieSelected));
        }
    };


    return (
        <View style={movie.movieCard}>
            <View style={movie.movieCover}>
                <Pressable onPress={() => navigate(Routes.movieDetails, { id: id })} style={({ pressed }) => [styles.TouchableBtn, { opacity: pressed ? 0.2 : 1 }]}>
                    <Image
                        source={{
                            uri: `${movieImgSrc
                                ? `https://image.tmdb.org/t/p/w500${movieImgSrc}`
                                : "https://images.unsplash.com/photo-1721332149371-fa99da451baa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
                                }`,
                        }}
                        style={{ width: "100%", height: "100%", objectFit: "fill" }}></Image>
                </Pressable>
            </View>
            <View style={movie.movieTitle}>
                <Text style={movie.movieTitleTXT}>{title ? title : "notFound"}</Text>
                <Text>
                    <Icon
                        name="cards-heart"
                        size={20}
                        color={favMovies.find((favobj) => favobj.id === id) ? "red" : "#fff"}
                        onPress={() => {
                            handelFavorite(id);
                        }}></Icon>
                </Text>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({});

export default Movie;
