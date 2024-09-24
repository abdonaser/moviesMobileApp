import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {


    },

    movieCard: {
        backgroundColor: "#333",
        width: "90%",
        marginHorizontal: "auto", // Use marginHorizontal: '5%' instead of auto in React Native for centering
        marginVertical: 10,
        overflow: "hidden",
        borderColor: "#33333",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 20,
        padding: 0,

        // Box shadow properties for iOS
        shadowColor: '#fff',         // Light color for the shadow
        shadowOffset: { width: 0, height: 4 },  // Shadow position
        shadowOpacity: 1.0,          // Opacity of the shadow
        shadowRadius: 10,            // Blur radius

        // Box shadow property for Android
        elevation: 15,                // Light elevation for Android shadow
    },

    movieCover: {
        width: "100%",
        height: 270,
    },

    movieCoverIMG: {
        width: "100%",
        height: "100%",
 
    },
    movieCoverPress: {
        width: "100%",
        height: "100%",
    },
    movieCoverImg: {
        width: "100%",
        height: "100%",
        objectFit: "fill" 
    },

    movieTitle: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    movieTitleTXT: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        width: "75%"
    },

    colorHeart: {
        color: "red"
    }

});