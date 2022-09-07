import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        width: 430,
        height: 696,
        top: 140,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 47,
    },
    trip: {
        top: -35,
        left: 47,
        color: "#666666",
        fontSize: 14,
        fontWeight: "bold",
    },
    baggageInfo: {
        borderColor: "#0399AB",
        borderWidth: 3,
        marginLeft: 60,
        borderRadius: 15,
        width: 304,
        height: 295,
        padding: 24,
    },
    baggageTitle: {
        fontSize: 17,
        fontWeight: "bold",
    },
    carryOnBaggage: {
        marginTop: 20,
    },
    checkedBaggage: {
        marginTop: 40,
    },
    baggagesInfoTitle: {
        color: "#0399AB",
        fontSize: 14,
        fontWeight: "bold",
    },
    baggagesInfoText: {
        fontSize: 14,
    },
    flightInfo: {
        borderColor: "#0399AB",
        borderWidth: 3,
        marginLeft: 60,
        marginTop: 21,
        borderRadius: 15,
        height: 253,
        width: 304,
        padding: 24,
    },
    flightDepartureInfo: {
        top: 25,
    },
    flightArrivalInfo: {
        left: 170,
        bottom: 120,
    }
})

export default styles;