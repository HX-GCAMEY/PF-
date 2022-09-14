import React from "react";
import { View, Text, Image, Dimensions, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import avion from "./img/backCard.jpg"
import card from './img/cardT.jpg'

const Cards = ({ item }) => {
    const navigation = useNavigation()
    const { _id, departure, arrival, defaultFare, totalSeats, duration, number } = item;

    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;


    const ANCHO_CONTENEDOR = width * 0.7;
    const ESPACIO = 10;
    const nav = () => {

        navigation.navigate('Detail', {
            flyId: _id,
            departCity: departure.city,
            departAirport: departure.airport,
            departDate: departure.date,
            departTime: departure.time,
            departAirportCode: departure.airportCode,
            arrivalCity: arrival.city,
            arrivalAirport: arrival.airport,
            arrivalDate: arrival.date,
            arrivalTime: arrival.time,
            arrivalAirportCode: arrival.airportCode,
            backgroundImage: arrival.backgroundImage,
            flyNumber: number,
            totalSeats: totalSeats,
            duration: duration,
            defaultFare: defaultFare,
        })
    }

    return (
        <Pressable onPress={() => nav()} style={styles.containerCards}>
            <View style={styles.imagenContainer}>
                <Image source={card} style={[styles.cardContainerr, { height: 265 }]} />
                <View style={styles.cardViewStyle}>
                    <Text style={styles.departCityCard}> ↗ {departure.city}</Text>
                    <Text style={styles.arrival}> ↷ {arrival.city}</Text>
                    <Text style={styles.textDep}>Departure</Text>
                    <Text style={styles.dateCard}>{departure.date}</Text>
                    <Text style={styles.timeCard}>{departure.time}</Text>
                    <Text style={styles.textArr}>Arrival</Text>
                    <Text style={styles.dateCardArrival}>{arrival.date}</Text>
                    <Text style={styles.timeCardArrival}>{arrival.time}</Text>
                    <Text style={styles.price}>$ {defaultFare.slice(0, 3) + "." + defaultFare.slice(3, 100)}</Text>
                    <Text style={styles.duration}>• Duration: {duration}</Text>
                </View>
            </View>
        </Pressable>

    )
}



export default Cards;