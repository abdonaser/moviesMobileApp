import React, { useContext, useEffect, useState } from "react";
import { FlatList, ScrollView, View, TouchableOpacity, LogBox, Text } from 'react-native';
import favStyle from "../Styles/FavoritesStyle.js"
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/Movie.js";
import NotFound from "../components/NotFound.js";


const Favorites = () => {
    const favMovies = useSelector(
        (state) => state.allFavMoviesStore.allFavMovies
    );

    return (
        <View>
            <FlatList
                data={favMovies}
                renderItem={({ item }) => {
                    return (
                        <Movie
                            title={item?.title}
                            movieImgSrc={item?.poster_path}
                            id={item?.id}
                        >

                        </Movie>
                    );
                }}

                // keyExtractor={({ id }) => item?.id}

                ListEmptyComponent={
                    <NotFound />
                }></FlatList>
        </View>
    );
}



export default Favorites;
