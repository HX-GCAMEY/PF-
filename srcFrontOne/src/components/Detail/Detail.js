import React from "react";
import { useRoute } from "@react-navigation/native";
import { Image, View, Text, ScrollView, Button, Dimensions, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
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
    
    const navigation = useNavigation();

    const widthMax = Dimensions.get("window").height;

    return (
        <ScrollView >
            <Image source={foto} style={{height: 441, width: widthMax}}/>
            <View style={styles.container}>
                <Text style={styles.title}>Departure from: {departAirportCode} {departAirport}</Text>
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
                    <Text style={{ fontWeight: "bold", fontSize: 17, position: "absolute", margin: 15}}>Flight Information</Text>
                    <Text></Text>
                    <View style={styles.flightDepartureInfo}>
                        <Text style={{ marginBottom: 5 }}>{departDate}</Text>
                        <Text style={{ marginBottom: 20 }}>{departTime}</Text>
                        <Text style={{ marginBottom: 5 }}>{departAirportCode}</Text>
                        <Text style={{ marginBottom: 20 }}>{departCity}</Text>
                        <Text>Departure Airport</Text>
                    </View>
                    <View style={styles.flightArrivalInfo}>
                        <Text style={{ marginBottom: 5 }}>{arrivalDate}</Text>
                        <Text style={{ marginBottom: 20 }}>{arrivalTime}</Text>
                        <Text style={{ marginBottom: 5 }}>{arrivalAirportCode}</Text>
                        <Text style={{ marginBottom: 20 }}>{arrivalCity}</Text>
                        <Text>Arrival Airport</Text>
                    </View>
                </View>
                <Pressable onPress={() => navigation.navigate('ShoppingCart', { 
                    flyId: flyId,

                    })}>
                    <LinearGradient colors={['#06C5C5', '#06C5C5']} style={{width: 304, height: 42, borderRadius: 20, marginLeft: 60, marginTop: 20}}>
                            <Text style={{fontSize: 16, fontWeight: "bold", color:"#FFFFFF95", textAlign: "center", top: 8}}>Add to Cart</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default Detail;