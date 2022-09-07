import React from "react";
import { useRef } from "react";
import { Image, View, Text, ScrollView, FlatList } from "react-native";
import foto from "./img/foto-prueba.jpg"
import valijas from "./img/baggages.png"
import styles from "./styles";

const Detail = () => {
    return (
            <ScrollView >                  
                <Image source={foto} style={{borderRadius: 30, bottom: 160}}/>
                <View style={styles.container}>
                    <Text style={styles.title}>Departure</Text>
                    <Text style={styles.trip}>DEPARTURE to ARRIVAL</Text>
                    <View style={styles.baggageInfo}>
                        <Text style={styles.baggageTitle}>Baggage</Text>
                        <Image source={valijas} style={{resizeMode: "contain", height: 204, right: 130, top: 20}}/>
                        <View style={{bottom: 190, left: 40}}>
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
                            <Text style={{marginBottom: 5}}>Date Departure</Text>
                            <Text style={{marginBottom: 20}}>Time Departure</Text>
                            <Text style={{marginBottom: 5}}>Airport Code</Text>
                            <Text style={{marginBottom: 20}}>Departure Place</Text>
                            <Text>Departure Airport</Text>
                        </View>
                        <View style={styles.flightArrivalInfo}>
                            <Text style={{marginBottom: 5}}>Date Arrival</Text>
                            <Text style={{marginBottom: 20}}>Time Arrival</Text>
                            <Text style={{marginBottom: 5}}>Airport Code</Text>
                            <Text style={{marginBottom: 20}}>Arrival Place</Text>
                            <Text>Arrival Airport</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
    )
}

export default Detail;