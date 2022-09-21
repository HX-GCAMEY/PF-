import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#efefefef"
    },
    cardContainer: {
        resizeMode: 'contain', 
        position: 'absolute', 
        width: 320, 
        height: 187, 
        borderRadius: 10,
        shadowColor: "#000", 
        shadowOffset: {width: 0, height: 1}, 
        shadowOpacity: 0.22, 
        shadowRadius: 2.22, 
        elevation: 3,
        top: 140,
        left: 37
    },
    cardNumber: {
        position: "absolute",
        color: "#FFFFFF",
        top: 225,
        left: 76,
        fontSize: 23,
    },
    expires: {
        position: "absolute",
        color: "#FFFFFF",
        top: 264,
        left: 275
    },
    month: {
        position: "absolute",
        color: "#FFFFFF",
        top: 286,
        left: 275
    },
    name: {
        position: "absolute",
        color: "#FFFFFF",
        top: 274,
        left: 76
    },
    visa: {
        position: "absolute",
        width: 81,
        height: 26,
        top: 165,
        left: 250
    },
})

export default styles;