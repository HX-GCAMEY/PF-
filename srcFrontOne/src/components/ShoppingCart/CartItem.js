import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, Image, Pressable } from "react-native";
import { Picker } from '@react-native-picker/picker';
import imagePrueba from "./img/foto-prueba.jpg"
import baggages from "./img/baggages.png"
import { setTicket } from "../../Redux/Actions/flights";
import styles from './styles';

const CartItem = ({ data, id, delFromCart }) => {

    const route = useRoute()
    //const tickets = useSelector((state) => state.flightsReducers.tickets);

    //const [clase, setClase] = useState('Flight Class'); //perdón Jacqui! te comenté algunas cosas
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
        totalSeatsParams,
        durationParams,
        defaultFareParams,
    } = route.params;

    let { _id, arrival, departure, duration, number, totalSeats, defaultFare, type, passengers } = data;
    const dispatch = useDispatch();
    return( 
        <View style={{
            margin: 10,
            marginLeft: 20,
            width: 357,
            height: 173,
            borderRadius: 10,
            backgroundColor: "#FFFFFF",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 5,
            shadowRadius: 0.05,

            elevation: 6,
            }}>
            <Image source={imagePrueba} style={{width: 153, height: 173, position: "absolute"}}/>
            <Text style={{fontSize:26, fontWeight: "bold", marginLeft: 190, marginTop: 15}}>{departAirportCode} - {arrivalAirportCode}</Text>
            <Text style={{marginLeft: 190, marginTop: 5, fontSize: 15}}>date:     {departDate}</Text>
            <Text style={{marginLeft: 190, marginTop: 10, fontSize: 17, fontWeight: "bold"}}>${defaultFareParams}</Text>
            <Image source={baggages} style={{resizeMode: "contain", height: 40, width: 90, marginLeft: 190, position: "absolute", top: 73, left: 60}}/>
            <Pressable style={{position:"absolute", top: 0, right: 0,backgroundColor: "#06C5C5", borderTopRightRadius: 10, borderBottomLeftRadius: 10, paddingLeft: 10, paddingTop: 6, width: 30, height: 30}} onPress={() => delFromCart(_id)}><Text style={{color:'#fff', fontWeight:"bold"}}>X</Text></Pressable>
            <Text style={styles.textClass}>Class: <Text style={styles.typeClass}>{type}</Text></Text>
            <Text style={styles.textPassengers}>Passengers: <Text style={styles.passengersNumber}>{passengers}</Text></Text>
            {/* <Picker
                selectedValue = {clase}
                onValueChange = {(itemValue, itemIndex) => { setClase(itemValue); }}
                style = {{ width: 163, marginLeft: 180, marginTop: 10}}
            >
                <Picker.Item label="Flight Class" value="Flight Class"/>
                <Picker.Item label="Basic" value="Basic"/>
                <Picker.Item label="Business" value="Business"/>
                <Picker.Item label="Premium" value="Premium"/>
            </Picker> */}
        </View>
    )
}

export default CartItem