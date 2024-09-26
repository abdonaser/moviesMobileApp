import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import movie from "../Styles/MovieStye";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { moviesContext } from "../Context/MoviesContextProvider.js";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavMovie, getAllFavFromFb_Action, puchFavMovie } from "../Redux/Slices/FavMoviesSlice.js";
import { useNavigation } from "@react-navigation/native";
import Routes from "../Utils/MyRoutes.js";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";



const Movie = ({ title, movieImgSrc, id, isGuest }) => {
    //!Use  ====================================
    const { colors } = useTheme();
    const { navigate } = useNavigation();
    const dispatch = useDispatch()

    //! states  ====================================
    // const FavIsloading = useSelector((state) => state.allFavMoviesStore.FavIsloading);
    const favMovies = useSelector(
        (state) => state.allFavMoviesStore.allFavMovies
    );
    const { allMovies } = useContext(moviesContext);

    const [handelFavoriteLoading, setHandelFavoriteLoading] = useState(false);

    // ! Functions  ====================================
    const handelFavorite = async (movieId) => {
        if (isGuest) {
            alert("Please SignIn First To Can Update Your Favorites ")
        } else {
            // console.log("====================================ascc");
            setHandelFavoriteLoading(true)
            // console.log("looodingStart ,", handelFavoriteLoading);

            const movieSelected = allMovies.results.find((obj) => obj.id === +id);
            const moviepressed_Fb_Id = favMovies?.find((obj) => obj.id === +movieId)

            try {
                if (moviepressed_Fb_Id) {
                    // console.log('Movies/deleteFavMovie > ');
                    await dispatch(deleteFavMovie(moviepressed_Fb_Id.movieId));//'to delet the movie From the cloud fireStore

                } else {
                    // console.log("'Movies/puchFavMovie' From Movies  => ");
                    await dispatch(puchFavMovie(movieSelected)); //'to add the movie to the cloud fireStore

                }

                await dispatch(getAllFavFromFb_Action()); //'to handel the fav icon and update favorites List 

            } catch (error) {
                console.error('Error handling favorite movie:', error);
            } finally {
                setHandelFavoriteLoading(false); // Stop loading
                // console.log("looodingFinished ,", handelFavoriteLoading); // At this point, it will be false
            }
        }
    };



    return (
        <View style={[movie.movieCard]}>
            <View style={movie.movieCover}>
                <Pressable onPress={
                    () => isGuest ? alert("please signIn First To Display The Details") : navigate(Routes.movieDetails, { id: id })
                }
                    style={
                        [movie.movieCoverPress, ({ pressed }) => [{ opacity: pressed ? 0.2 : 1 }]]
                    }
                >
                    <Image
                        source={{
                            uri: `${movieImgSrc
                                ? `https://image.tmdb.org/t/p/w500${movieImgSrc}`
                                : "https://images.unsplash.com/photo-1721332149371-fa99da451baa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
                                }`,
                        }}

                        style={movie.movieCoverImg}
                    />
                </Pressable>
            </View>
            <View style={movie.movieTitle}>
                <Text style={movie.movieTitleTXT}>{title ? title : "notFound"}</Text>
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
        </View >
    );
};

const styles = StyleSheet.create({});

export default Movie;
