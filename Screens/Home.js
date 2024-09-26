import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, FlatList, ScrollView, View, TouchableOpacity, LogBox, Platform, TextInput, StyleSheet } from "react-native";
import mainStyle from "../Styles/mainStyle.js";
import { moviesContext } from "../Context/MoviesContextProvider.js.js";
import { Picker } from '@react-native-picker/picker';

import {
    Avatar,
    Card,
    IconButton,
    ActivityIndicator,
    MD2Colors, Searchbar,
    Button, Menu, Divider, Provider,
    useTheme,
    List
} from "react-native-paper";

import Movie from "../components/Movie.js";

import { Dropdown } from 'react-native-paper-dropdown';
import NotFound from "../components/NotFound.js";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getAllFavFromFb_Action } from "../Redux/Slices/FavMoviesSlice.js";
import { SafeAreaView } from "react-native-safe-area-context";
import Routes from "../Utils/MyRoutes.js";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from "react-native/Libraries/NewAppScreen";

const Home = ({ userEmail, isGuest }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const FavIsloading = useSelector((state) => state.allFavMoviesStore.FavIsloading);


    const { allMovies, allMoviesLoading, allMoviesError, dispatchAllMovies } =
        useContext(moviesContext);

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
    // const itemRef = useRef(null);
    // const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const [activeCategory, setActiveCategory] = useState(false);



    const OPTIONS = [
        { label: 'All', value: 'all', iconName: "view-gallery" },
        { label: 'Top Rated', value: 'top_rated', iconName: "trending-up" },
        { label: 'Popular', value: 'popular', iconName: "account-group" },
        { label: 'UpComing', value: 'upcoming', iconName: "filmstrip" },

    ];

    const handelFilterOptions = (value, index) => {
        // '---handel scrollveiw

        // const selected = itemRef.current[index]; // Access the ref for the selected item
        // selected?.measure((fx, fy, width, height, px, py) => {
        //     scrollRef.current?.scrollTo({ x: px, y: 0, animated: true });
        // });
        // '-------------End handel scrollveiw
        setActiveIndex(index)

        setFilterOptions(value)
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTRlZjhmNTAzM2FhYTBiM2Y2ODdkM2MxY2Q2OWExNCIsIm5iZiI6MTcyMzc5NjUzNS4zMjY2MTUsInN1YiI6IjY1MWE3ZDMwZDg2MWFmMDBhZTMyMDZiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q6xg2jcA6Qe2KVkOt5l950rfks43jMNXBp6J0aSyJvs'
            }
        };
        if (value != "all") {
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


    //! ! ----------------------------------------

    //! ! ----------------------------------------

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
                        <Text style={[mainStyle.welcomeText, { color: colors.text, padding: 10 }]}>
                            Welcome... {" "}
                            <Text style={{ color: colors.appName }}>{userEmail.split("@")[0]}</Text>
                        </Text>



                        <View style={styles.searchSectionWrapper}>
                            <View
                                style={
                                    styles.searchBar
                                }
                            >
                                {/* <Ionicons
                                    name="search"
                                    size={18}
                                    style={{ marginRight: 5 }}
                                    color={colors.text}
                                /> */}
                                {/* <TextInput
                                    placeholder="Search..."
                                    placeholderTextColor={colors.text}
                                    style={{ color: colors.text }}
                                /> */}
                                <Searchbar
                                    style={[styles.SearchbarField, { color: colors.text }]}
                                    placeholder="Search"
                                    onChangeText={(value) => { handelSearch(value) }}
                                    value={searchQuery}
                                />
                            </View>
                            <TouchableOpacity
                                style={[styles.filterBtn, { backgroundColor: activeCategory ? "tomato" : "#0096FF" }]}
                                onPress={() => {
                                    // console.log("activeCategory ", r);
                                    setActiveCategory((prev) => !prev)
                                }}
                            >
                                <Ionicons
                                    name="options"
                                    size={28}
                                    color={activeCategory ? colors.text : colors.background}
                                />
                            </TouchableOpacity>
                        </View>

                        {activeCategory &&
                            <View style={[styles.categoryContainer, { paddingHorizontal: 10 }]}>
                                {/* <Text style={[styles.categoriesTitle, { color: colors.text }]}>Categories</Text> */}
                                <ScrollView
                                    // ref={scrollRef}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{
                                        gap: 20,
                                        paddingVertical: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    {OPTIONS.map((option, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                // ref={(el) => (itemRef.current[index] == el)}
                                                onPress={() => handelFilterOptions(option.value, index)}
                                                style={[
                                                    styles.categoryBtn,
                                                    activeIndex == index
                                                        ? { backgroundColor: "tomato" }
                                                        : { backgroundColor: colors.searchBarBg },
                                                ]}

                                            >
                                                <MaterialCommunityIcons
                                                    name={option.iconName}
                                                    size={20}
                                                    style={{ color: colors.text }}
                                                />
                                                <Text style={[styles.categoryBtnText, { color: colors.text }]}>
                                                    {option.label}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                            </View>}

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
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 120, }}
                />
            </View>
        </View >
    );

};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        marginRight: 10,
    },
    picker: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginLeft: 10,
        // Ensure that the picker width is sufficient to display the options
        minWidth: 120,
    },
    searchSectionWrapper: {
        flexDirection: "row",
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    searchBar: {
        flex: 1,
    },
    SearchbarField: {
        borderRadius: 10,
        padding: 0,
    },
    filterBtn: {
        padding: 10,
        borderRadius: 10,
        marginLeft: 20,
        display: "flex",
        justifyContent: "center"
    },
    categoryBtn: {

        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 15,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        shadowColor: "#333333",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3
    },
    categoryBtnText: {
        marginLeft: 5
    },
    categoryContainer: {
        paddingHorizontal: 16,
        // backgroundColor: "teal"

    }
});
export default Home;