import React from "react";
import { Image, View, Text } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import planeImage from "./plane2.png"
import styles from "./styles";
import { Button } from "native-base";

const FlightCard = ({ departure, departureTime, destination, destinationTime, fare }) => {
    return (
        <View>
            <LinearGradient colors={['#0188A2', '#30CECE']} style={styles.container}>
                <Text style={styles.departurePlace}>{departure}</Text>
                <Text style={styles.departureTime}>{departureTime}</Text>
                <Text style={styles.destinationPlace}>{destination}</Text>
                <Text style={styles.destinationTime}>{destinationTime}</Text>
                <Text style={styles.fare}>{fare}</Text>
                <Image source={planeImage} style={{resizeMode: "contain", flex: 5, width: 100, position: "absolute", bottom: -70, left: 60}}/>
                {/*<Button style={{width:80, height:20, borderRadius:15, flexDirection: 'row', position: "absolute", top: 75, left: 245}} title="NEXT" color="#0188A2"/>*/}
                
            </LinearGradient>
        </View>
    )
}

export default FlightCard;