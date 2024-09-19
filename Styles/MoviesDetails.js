import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
        borderBottomWidth: 0,
        // borderBottomLeftRadius: 0,
        // borderBottomRightRadius: 0,
        // padding: 20
    },
    detailsContainer: {
        width: "95%",
        marginHorizontal: "auto",
        marginVertical: 10,
    },
    detailsItem: {
        // backgroundColor: "teal",
        padding: 2,
        flexDirection: "row",
        flexWrap: 'wrap',
        overflow: "hidden",
        marginBottom: 5
    },
    detailsItemLeft: {
        fontWeight: "bold",
        color: "#fff",

    },
    detailsItemRight: {
        flexWrap: 'wrap',
        marginLeft: 20,
        color: "#fff"

    },
    detailsItemRightOver: {
        marginLeft: 120,
        color: "#fff"

    }


});