import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        marginHorizontal: 21,
        margin: 15,
        //height: 78,
        height: 156,
        width: 349,
    },
    departurePlace: {
        fontSize: 18,
        fontWeight: "bold",
        position: "absolute",
        top: 20,
        left: 24,
    },
    destinationPlace: {
        fontSize: 18,
        fontWeight: "bold",
        position: "absolute",
        top: 90,
        left: 166,
    },
    departureTime: {
        position: "absolute",
        top: 43,
        left: 24,
    },
    destinationTime: {
        position: "absolute",
        top: 113,
        left: 166,
    },
    fare: {
        position: "absolute",
        top: 75,
        left: 258,
    },
})

export default styles;