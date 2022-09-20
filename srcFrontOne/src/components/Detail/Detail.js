import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Image, View, Text, ScrollView, Dimensions, Pressable, Modal, TouchableOpacity, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import foto from "./img/foto-prueba.jpg"
import valijas from "./img/baggages.png"
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getFlights, clearTickets } from "../../Redux/Actions/flights";
import { Picker } from '@react-native-picker/picker';


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

    const [clase, setClase] = useState('basic');

    const navigation = useNavigation();

    const widthMax = Dimensions.get("window").height;

    const dispatch = useDispatch();
    const flights = useSelector((state) => state.flightsReducers.flights);
    const flightCart = useSelector((state) => state.flightsReducers.cart)

    useEffect(() => {
        dispatch(getFlights())
    }, [dispatch])


    //para crear el modal y seleccionar la cantidad de pasajes
    const [modalVisible, setModalVisible] = useState(false);
    const [passengers, setPassengers] = useState(1);

    const sumar = () => {
        if (passengers < 8) setPassengers(passengers + 1)
    }

    const restar = () => {
        if (passengers > 1) setPassengers(passengers - 1)
    }

    const next = () => {
        const newTicket = {
            flyId: flyId,
            departDate: departDate,
            departAirportCode: departAirportCode,
            arrivalAirportCode: arrivalAirportCode,
            defaultFare: defaultFare,
            passengers: passengers,
            type: clase
        }
        dispatch(addToCart(newTicket))
        
        navigation.navigate('ShoppingCart'
        // , {
        //     flyId: flyId,
        //     departCity: departCity,
        //     departAirport: departAirport,
        //     departDate: departDate,
        //     departTime: departTime,
        //     departAirportCode: departAirportCode,
        //     arrivalCity: arrivalCity,
        //     arrivalAirport: arrivalAirport,
        //     arrivalDate: arrivalDate,
        //     arrivalTime: arrivalTime,
        //     arrivalAirportCode: arrivalAirportCode,
        //     backgroundImage: backgroundImage,
        //     flyNumber: flyNumber,
        //     totalSeatsParams: totalSeats,
        //     durationParams: duration,
        //     defaultFareParams: defaultFare,
        //     passengers: passengers,
        //     type: clase
        // }
        )
        //me quita el modal
        setModalVisible(!modalVisible);
        //setea el modal en 1
        setPassengers(1)
    }

    const add = () => {
        //dispatch(addToCart(flyId));
        setModalVisible(true)
    }

    const onCloseModal = () => {
        setPassengers(1)
        setModalVisible(false)
    }

    return (
        <ScrollView >
            <Image source={foto} style={{ height: 441, width: widthMax }} />
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
                    <Text style={{ fontWeight: "bold", fontSize: 17, position: "absolute", margin: 15 }}>Flight Information</Text>
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
                <Pressable onPress={() => add(flyId)}>
                    <LinearGradient colors={['#06C5C5', '#06C5C5']} style={{ width: 304, height: 42, borderRadius: 20, marginLeft: 60, marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#FFFFFF95", textAlign: "center", top: 8 }}>Add to Cart</Text>
                    </LinearGradient>
                </Pressable>
                <Modal
                    animationType="slide"
                    transparent
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20, flex: 1 }}>
                        <View style={styles.modalView}>
                            <View>
                                <TouchableOpacity onPress={() => onCloseModal()}>
                                    <FontAwesome name='close' color={'#e5ab17ed'} size={40} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "bold", marginTop: 20 }}>Passengers</Text>
                            <View style={{ backgroundColor: "#FFF", borderRadius: 15, marginTop: 5 }}>
                                <Pressable onPress={() => restar()} style={{ marginRight: 50 }}>
                                    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={{ borderRadius: 15, width: 65, height: 30 }}>
                                        <Text style={{ justifyContent: "center", fontSize: 22, fontWeight: "bold", marginLeft: 20 }}>-</Text>
                                    </LinearGradient>
                                </Pressable>
                                <Pressable onPress={() => sumar()} style={{ position: "absolute", marginLeft: 50 }}>
                                    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={{ borderRadius: 15, width: 65, height: 30 }}>
                                        <Text style={{ justifyContent: "center", fontSize: 22, fontWeight: "bold", marginLeft: 35 }}>+</Text>
                                    </LinearGradient>
                                </Pressable>
                                <Text style={{ position: "absolute", marginLeft: 50, fontSize: 22, fontWeight: "bold", backgroundColor: "#FFFFFF" }}>{passengers}</Text>
                            </View>

                            <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "bold", marginTop: 10 }}>Class</Text>
                            <View style={styles.viewPicker} >
                                <Picker
                                    selectedValue={clase}
                                    onValueChange={itemValue => setClase(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Basic" value="Basic" />
                                    <Picker.Item label="Business" value="Business" />
                                    <Picker.Item label="Premium" value="Premium" />
                                </Picker>
                            </View>

                            <Pressable onPress={() => next()}>
                                <LinearGradient colors={['#06C5C5', '#06C5C5']} style={{ borderRadius: 14, width: 168, justifyContent: 'center', height: 38, top: 40 }}>
                                    <Text style={{ textAlign: "center", color: "#FFFFFF", fontSize: 20, fontWeight: 'bold' }}>Next</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    )
}

//

export default Detail;