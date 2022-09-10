import React from "react";
import { useRoute } from "@react-navigation/native";
// import { useRef } from "react";
import { Image, View, Text, ScrollView } from "react-native";
import foto from "./img/foto-prueba.jpg"
import valijas from "./img/baggages.png"
import styles from "./styles";

const Detail = () => {
    const route = useRoute();
    const {
        flyId,
        departCity,
        departAirport,
        departDate,
        departTime,
        departAirportCode,
        arrivalCity,
        arrivalAirport,
        arrivalDate,
        arrivalTime,
        arrivalAirportCode,
        backgroundImage,
        flyNumber,
        totalSeats,
        duration,
        defaultFare,
    } = route.params;

    return (
        <ScrollView >
            <Image source={foto} style={{ bottom: 160, minHeight: 1050 }} />
            <View style={styles.container}>
                <Text style={styles.title}>Departure from: {departAirportCode} {departAirport}</Text>
                <Text style={styles.trip}>DEPARTURE to ARRIVAL</Text>
                <View style={styles.baggageInfo}>
                    <Text style={styles.baggageTitle}>Baggage</Text>
                    <Image source={valijas} style={{ resizeMode: "contain", height: 204, right: 130, top: 20 }} />
                    <View style={{ bottom: 190, left: 40 }}>
                        <View>
                            <Text style={styles.baggagesInfoTitle}>Backpack or handbag included</Text>
                            <Text style={styles.baggagesInfoText}>Must fit under the front seat.</Text>
                        </View>
                        <View style={styles.carryOnBaggage}>
                            <Text style={styles.baggagesInfoTitle}>Carry-on baggage included</Text>
                            <Text style={styles.baggagesInfoText}>Must fit inside the airplane compartment.</Text>
                        </View>
                        <View style={styles.checkedBaggage}>
                            <Text style={styles.baggagesInfoTitle}>Checked baggage included</Text>
                            <Text style={styles.baggagesInfoText}>You can add bags for an additional charge when arriving at the airport.</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flightInfo}>
                    <Text>Airline Name</Text>
                    <Text></Text>
                    <View style={styles.flightDepartureInfo}>
                        <Text style={{ marginBottom: 5 }}>Date Departure: {departDate}</Text>
                        <Text style={{ marginBottom: 20 }}>Time Departure: {departTime}</Text>
                        <Text style={{ marginBottom: 5 }}>Airport Code: {departAirportCode}</Text>
                        <Text style={{ marginBottom: 20 }}>Departure Place: {departCity}</Text>
                        <Text>Departure Airport</Text>
                    </View>
                    <View style={styles.flightArrivalInfo}>
                        <Text style={{ marginBottom: 5 }}>Date Arrival: {arrivalDate}</Text>
                        <Text style={{ marginBottom: 20 }}>Time Arrival: {arrivalTime}</Text>
                        <Text style={{ marginBottom: 5 }}>Airport Code: {arrivalAirportCode}</Text>
                        <Text style={{ marginBottom: 20 }}>Arrival Place: {arrivalCity}</Text>
                        <Text>Arrival Airport</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Detail;