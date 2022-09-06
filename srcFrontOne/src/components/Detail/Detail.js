import React from "react";
import { Image, View, Text, ScrollView } from "react-native";
import foto from "./img/foto-prueba.jpg"
import valijas from "./img/baggages.png"
import styles from "./styles";



const Detail = () => {
    return (
            <ScrollView>
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
                </View>
            </ScrollView>
    )
}

export default Detail;