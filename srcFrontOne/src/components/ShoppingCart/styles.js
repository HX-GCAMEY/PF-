import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textClass: {
        position: 'absolute',
        bottom: 35,
        left: 189,
        fontSize: 16
    },
    typeClass: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textPassengers: {
        position: 'absolute',
        bottom: 10,
        left: 202,
        fontSize: 16
    },
    passengersNumber: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    resumen: {
        left: 80,
        fontSize: 16,
        color: "#FFFFFF",
    },
    resumenTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        left: 80
    },
    resumenFare: {
        fontSize: 16,
        color: "#FFFFFF",
        left: 280,
        top: -20,
    },
    separacion: {
        color: "#FFFFFF80",
        fontWeight: "bold",
        top: -10,
        left: 120,
        
    },
    boton: {
        width: 318,
        height: 32,
        left: 40,
        top: 10,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 35,
        borderTopLeftRadius: 25,
    }
});

export default styles;