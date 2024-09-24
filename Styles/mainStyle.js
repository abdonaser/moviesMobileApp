import { StyleSheet } from "react-native";
export default StyleSheet.create({
    welcomeText: {
        paddingHorizontal: 15,
        // paddingVertical: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },

    boxContainer: {
        width: "100%",
        padding: 4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
    }, search: {
        borderColor: "#333",
        borderWidth: 1,
        borderStyle: "solid",
        width: "60%"
    }, filter: {
        borderColor: "#333",
        borderWidth: 1,
        borderStyle: "solid",
        width: "37%",
        borderRadius: 30,
        overflow: "hidden",
    }, filterdrop: {
        textAlign: "center",
        color: "red",
    }


});