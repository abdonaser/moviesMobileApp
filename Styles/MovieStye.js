import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {


    },
    movieCard: {
        width: "95%",
        marginHorizontal: "auto",
        marginVertical: 10,
        overflow: "hidden",
        borderColor: "#33333",
        borderWidth: 2,
        borderStyle: "solid",

        borderRadius: 20,

        padding: 0,
        backgroundColor: "#333"

    },
    movieCover: {
        width: "100%",
        height: 250,


    },
    movieCoverIMG: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 20,
    },
    movieTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
    movieTitleTXT: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    colorHeart: {
        color: "red"
    }

});