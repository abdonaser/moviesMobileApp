import React, { useContext, useEffect, useState } from "react";
import { Text, FlatList, ScrollView, View, TouchableOpacity, LogBox } from "react-native";
import mainStyle from "../Styles/mainStyle.js";
import { moviesContext } from "../Context/MoviesContextProvider.js.js";

import {
    Avatar,
    Card,
    IconButton,
    ActivityIndicator,
    MD2Colors, Searchbar
} from "react-native-paper";

import Movie from "../components/Movie.js";

import { Dropdown } from 'react-native-paper-dropdown';
import NotFound from "../components/NotFound.js";

const Home = () => {
    const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

    const { allMovies, allMoviesLoading, allMoviesError, dispatchAllMovies } =
        useContext(moviesContext);
        
    const [filterMovies, setFilterMovies] = useState([]);

    useEffect(
        () => {
            setFilterMovies(allMovies?.results)
        }
        , [allMovies]);

    //! search==============================================
    const [searchQuery, setSearchQuery] = useState("");

    const handelSearch = (value) => {
        setSearchQuery(value);

        const searchMovies = []
        {
            allMovies.results.map((movie) => {
                if (movie.original_title) {
                    if (movie.title.toLowerCase().includes(value.toLowerCase()) == true) {
                        searchMovies.push(movie)
                    }
                }
            });
        }
        //'movie.original_title?.includes(value.toLowerCase())

        setFilterMovies(searchMovies);
    };

    //! search==============================================

    //! Filtration==============================================

    const [filterilterOptions, setFilterOptions] = useState();

    const OPTIONS = [
        { label: 'Top Rated', value: 'top_rated' },
        { label: 'Popular', value: 'popular' },
        { label: 'UpComing', value: 'upcoming' },
    ];

    const handelFilterOptions = (value) => {
        setFilterOptions(value)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTRlZjhmNTAzM2FhYTBiM2Y2ODdkM2MxY2Q2OWExNCIsIm5iZiI6MTcyMzc5NjUzNS4zMjY2MTUsInN1YiI6IjY1MWE3ZDMwZDg2MWFmMDBhZTMyMDZiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q6xg2jcA6Qe2KVkOt5l950rfks43jMNXBp6J0aSyJvs'
            }
        };
        if (value) {
            fetch(`https://api.themoviedb.org/3/movie/${value}?language=en-US&page=1`, options)
                .then(response => response.json())
                .then(response => dispatchAllMovies({ type: "Filtration", payload: response }))
                .catch(err => console.error(err));
        } else {
            fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
                .then((response) => response.json())
                .then(response => dispatchAllMovies({ type: "getAllMovies", payload: response }))
                .catch(err => setAllMoviesError(err));
        }

    }

    if (allMoviesLoading) {
        return <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            style={{ marginTop: 350 }}
        />;
    }

    if (allMoviesError) {
        return <Text>Error: {allMoviesError.message} </Text>;
    }

    if (!allMovies) {
        return <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            style={{ marginTop: 350 }}
        />;
    }

    return (

        <View>
            <View style={mainStyle.boxContainer}>
                <Searchbar
                    style={mainStyle.search}
                    placeholder="Search"
                    onChangeText={(value) => { handelSearch(value) }}
                    value={searchQuery}
                />
                <View style={mainStyle.filter}>
                    <Dropdown
                        style={mainStyle.filter}
                        label="Filter"
                        placeholder="Select Gender"
                        options={OPTIONS}
                        value={filterilterOptions}
                        // onSelect={setGender}
                        onSelect={(value) => {
                            handelFilterOptions(value)
                        }}
                        menuContentStyle={{ width: 180, position: "relative", left: -60, top: 65, }}
                        optionStyle={{ fontSize: '20px' }}
                    />
                </View>
            </View>

            <FlatList
                data={filterMovies}
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
                // keyExtractor={({ hexCode }) => hexCode}
                ListEmptyComponent={
                    <NotFound></NotFound>
                }></FlatList>
        </View>

    );
};

export default Home;
