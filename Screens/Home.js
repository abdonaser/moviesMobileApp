import React, { useContext, useEffect, useState } from "react";
import { Text, FlatList, ScrollView, View, TouchableOpacity, LogBox, Platform } from "react-native";
import mainStyle from "../Styles/mainStyle.js";
import { moviesContext } from "../Context/MoviesContextProvider.js.js";

import {
    Avatar,
    Card,
    IconButton,
    ActivityIndicator,
    MD2Colors, Searchbar,
    Button, Menu, Divider, Provider,
    useTheme
} from "react-native-paper";

import Movie from "../components/Movie.js";

import { Dropdown } from 'react-native-paper-dropdown';
import NotFound from "../components/NotFound.js";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getAllFavFromFb_Action } from "../Redux/Slices/FavMoviesSlice.js";
import { SafeAreaView } from "react-native-safe-area-context";
import Routes from "../Utils/MyRoutes.js";

const Home = ({ userEmail, isGuest }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const FavIsloading = useSelector((state) => state.allFavMoviesStore.FavIsloading);

    console.log("userEmail ", isGuest);
    //   userEmail.split("@")[0] 




    const { allMovies, allMoviesLoading, allMoviesError, dispatchAllMovies } =
        useContext(moviesContext);

    // console.log(allMovies);
    const [filterMovies, setFilterMovies] = useState([]);

    useEffect(

        () => {
            if (isFocused) {
                dispatch(getAllFavFromFb_Action());
            }
            setFilterMovies(allMovies?.results)
        }
        , [allMovies, isFocused]);



    //- Start search==============================================
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchEmpty, setIsSearchEmpty] = useState(false);

    const handelSearch = (value) => {
        setSearchQuery(value);
        const searchMovies = [];

        allMovies.results.map((movie) => {
            if (movie.original_title) {
                if (movie.title.toLowerCase().includes(value.toLowerCase())) {
                    searchMovies.push(movie);
                }
            }
        });

        if (searchMovies.length > 0) {
            setFilterMovies(searchMovies);
            setIsSearchEmpty(false);  // Search results found, so reset the "not found" state
        } else {
            setIsSearchEmpty(true);  // No search results found
            setFilterMovies([]);  // Clear the current filtered movies
        }
    };

    //! End search==============================================

    //- start Filtration==============================================
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
        }
        else {
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
        <View
            style={{
                flex: 1,
                // backgroundColor: "red",  // Ensure the view takes up the full screen height
                paddingTop: Platform.OS === "android" ? (isGuest ? 20 : 0) : 0, // Adjust for Android status bar
            }}
        >
            <View style={{ margin: 0, width: "100%", alignContent: "flex-start" }}>

                {isGuest ?
                    <View>
                        <Text style={[mainStyle.welcomeText, { color: colors.text, fontSize: 13, fontWeight: "bold" }]}>
                            <Text
                                style={[mainStyle.pleaseSignIn, { color: colors.appName, fontSize: 18, textDecorationLine: "underline" }]}
                                onPress={() => {
                                    navigation.navigate(Routes.SignIn);
                                }}
                            >
                                signin
                            </Text>
                            {" ..."}To discovering amazing features!
                        </Text>
                        {/* <Text style={{ color: colors.appName }}>{nameName || "noooo"}</Text> */}
                    </View>
                    :
                    (<>
                        <Text style={[mainStyle.welcomeText, { color: colors.text, padding: 5 }]}>
                            Welcome... {" "}
                            <Text style={{ color: colors.appName }}>{userEmail.split("@")[0]}</Text>
                        </Text>
                        <View style={[mainStyle.boxContainer, { color: colors.text, margin: 0 }]}>

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
                                    onSelect={(value) => {
                                        handelFilterOptions(value);
                                    }}
                                    menuContentStyle={{ width: 180, position: "relative", left: -60, top: 65 }}
                                    optionStyle={{ fontSize: '20px' }}
                                />
                            </View>
                        </View>
                    </>)

                }

                <FlatList
                    data={filterMovies}
                    renderItem={({ item }) => {
                        // console.log("=================item======================");
                        // console.log(item.title);
                        return (
                            <Movie
                                title={item?.title}
                                movieImgSrc={item?.poster_path}
                                id={item?.id}
                                isGuest={isGuest}
                            />
                        )
                    }}
                    ListEmptyComponent={<NotFound isSearchEmpty={isSearchEmpty} />}
                />

            </View>
        </View >
    );

};

export default Home;