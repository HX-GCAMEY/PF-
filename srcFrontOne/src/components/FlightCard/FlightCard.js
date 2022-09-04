import React from "react";
import { Image, View, Text } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import planeImage from "./plane2.png"
import styles from "./styles";

const FlightCard = ({ departure, departureTime, destination, destinationTime, fare }) => {
    return (
        <LinearGradient colors={['#07C5C5', '#0184A0']} style={styles.container}>
            <View>
                <Text style={styles.departurePlace}>{departure}</Text>
                <Text style={styles.departureTime}>{departureTime}</Text>
                <Text style={styles.destinationPlace}>{destination}</Text>
                <Text style={styles.destinationTime}>{destinationTime}</Text>
                <Text style={styles.fare}>{fare}</Text>
            </View>
        </LinearGradient>
    )
}

export default FlightCard;