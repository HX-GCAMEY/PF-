import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const FlightCard = ({ departure, departureTime, destination, destinationTime, defaultFare }) => {
    return (
        <View style={styles.container}>
            <Text>Vuelo</Text>
            <Text>{departure}</Text>
            <Text>{departureTime}</Text>
            <Text>{destination}</Text>
            <Text>{destinationTime}</Text>
            <Text>{defaultFare}</Text>
        </View>
    )
}

export default FlightCard;