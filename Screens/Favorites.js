import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/Movie.js";
import NotFound from "../components/NotFound.js";
import { useIsFocused } from "@react-navigation/native";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../app/Helpers/firebaseConfig.js";
import { allFavMoviesFromFb, getAllFavFromFb_Action } from "../Redux/Slices/FavMoviesSlice.js";
import { ActivityIndicator, Button, MD2Colors, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import favoritesStyle from "../Styles/FavoritesStyle.js";

const Favorites = () => {
    const { colors } = useTheme();
    const isFocused = useIsFocused();
    const favMovies = useSelector((state) => state.allFavMoviesStore.allFavMovies);
    const FavIsloading = useSelector((state) => state.allFavMoviesStore.FavIsloading);
    const dispatch = useDispatch();
    const [deleteAllLoading, setDeleteAllLoading] = useState(false);

    // const DeleteAllFavFromFb = async () => {
    //     setDeleteAllLoading(true)
    //     try {
    //         const collectionRef = collection(db, "favoriteMovies");
    //         const querySnapshot = await getDocs(collectionRef);
    //         const deletePromises = await querySnapshot.docs.map((document) => {
    //             return deleteDoc(doc(db, "favoriteMovies", document.id));
    //         });
    //         await dispatch(getAllFavFromFb_Action());
    //         console.log("success Deleteall => favMovies = ", favMovies.length);
    //         await setDeleteAllLoading(false)
    //     }
    //     catch (error) {
    //         console.log("someThing wrong in deleting from Fb ", error);
    //         setDeleteAllLoading(true)
    //     }
    // }

    const DeleteAllFavFromFb = async () => {
        setDeleteAllLoading(true);
        try {
            const collectionRef = collection(db, "favoriteMovies");
            const querySnapshot = await getDocs(collectionRef);

            const deletePromises = querySnapshot.docs.map((document) =>
                deleteDoc(doc(db, "favoriteMovies", document.id))
            );

            await Promise.all(deletePromises);

            await dispatch(getAllFavFromFb_Action());
        } catch (error) {
            console.log("Something went wrong while deleting from Firestore:", error);
        } finally {
            setDeleteAllLoading(false);
        }
    };




    useEffect(() => {
        if (isFocused) {
            dispatch(getAllFavFromFb_Action());
        }
    }, [isFocused]);



    if (FavIsloading) {
        return <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            style={{ marginTop: 350 }}
        />;
    }
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]} >

            <FlatList
                style={styles.flatList}
                data={favMovies}
                renderItem={({ item }) => (
                    <Movie
                        title={item?.title}
                        movieImgSrc={item?.poster_path}
                        id={item?.id}
                    />
                )}
                keyExtractor={({ id }) => id.toString()}
                ListEmptyComponent={<NotFound />}
            />
            {
                favMovies.length > 0 && (
                    <View style={styles.deleteButtonContainer}>
                        <Button
                            mode="contained"
                            onPress={DeleteAllFavFromFb}
                            style={favoritesStyle.deleteAllBtn}
                            labelStyle={{ color: '#000' }}
                        >
                            {deleteAllLoading ? (
                                <ActivityIndicator animating={true} color={MD2Colors.black} />
                            ) : (
                                'Delete All'
                            )}
                        </Button>
                    </View>
                )
            }
        </View >
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
        // backgroundColor: "black",
    },
    deleteButtonContainer: {
        // backgroundColor:"teal",
        position: 'absolute',
        bottom: 0,
        right: 20,
        left: 20,
        zIndex: 9999,
    },
    flatList: {
        marginBottom: 50
    },
});
export default Favorites;
