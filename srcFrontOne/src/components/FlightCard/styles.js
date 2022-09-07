import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        marginHorizontal: 21,
        margin: 15,
        //height: 78,
        height: 120,
        width: 349,
    },
    departurePlace: {
        fontSize: 18,
        fontWeight: "bold",
        position: "absolute",
        top: 35,
        left: 24,
    },
    destinationPlace: {
        fontSize: 18,
        fontWeight: "bold",
        position: "absolute",
        top: 35,
        left: 166,
    },
    departureTime: {
        position: "absolute",
        top: 58,
        left: 24,
    },
    destinationTime: {
        position: "absolute",
        top: 58,
        left: 166,
    },
    fare: {
        position: "absolute",
        top: 48,
        left: 258,
    },
})

export default styles;