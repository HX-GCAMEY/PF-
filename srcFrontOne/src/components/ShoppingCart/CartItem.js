import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, Pressable } from "react-native";
import imagePrueba from "./img/foto-prueba.jpg"
import baggages from "./img/baggages.png"
import { modifyFromCart, setTicket } from "../../Redux/Actions/flights";
import styles from './styles';

const CartItem = ({ data, id, delFromCart }) => {

    //const route = useRoute()
    //const tickets = useSelector((state) => state.flightsReducers.tickets);

    //const [clase, setClase] = useState('Flight Class'); //perdón Jacqui! te comenté algunas cosas
    // const {
    //     flyId,
    //     departCity,
    //     departAirport,
    //     departDate,
    //     departTime,
    //     departAirportCode,
    //     arrivalCity,
    //     arrivalAirport,
    //     arrivalDate,
    //     arrivalTime,
    //     arrivalAirportCode,
    //     backgroundImage,
    //     flyNumber,
    //     totalSeatsParams,
    //     durationParams,
    //     defaultFareParams,
    // } = route.params;

    let { _id, arrival, departure, duration, number, totalSeats, type, passengers, departAirportCode, arrivalAirportCode
    , departDate, defaultFare } = data;

    const [modificarPasajeros, setModificarPasajeros] = useState(passengers)

    const suma = () => {
        if(modificarPasajeros < 8)
        setModificarPasajeros(modificarPasajeros + 1)
    }

    const resta = () => {
        if(modificarPasajeros > 1)
        setModificarPasajeros(modificarPasajeros - 1)
    }

    const dispatch = useDispatch();

    const modify = {
        flyId: _id,
        passengers: modificarPasajeros
    }

    return( 
        <View style={{
            margin: 10,
            marginLeft: 20,
            width: 357,
            height: 210,
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
            <Image source={imagePrueba} style={{width: 170, height: 210, position: "absolute"}}/>
            <Text style={{fontSize:26, fontWeight: "bold", marginLeft: 185, marginTop: 30}}>{departAirportCode} - {arrivalAirportCode}</Text>
            <Text style={{marginLeft: 185, marginTop: 5, fontSize: 15}}>date:     {departDate}</Text>
            <Text style={{marginLeft: 185, marginTop: 10, fontSize: 17, fontWeight: "bold"}}>${defaultFare}</Text>
            <Image source={baggages} style={{resizeMode: "contain", height: 40, width: 90, marginLeft: 190, position: "absolute", top: 88, left: 60}}/>
            <Pressable style={{position:"absolute", top: 0, right: 0,backgroundColor: "#06C5C5", borderTopRightRadius: 10, borderBottomLeftRadius: 10, paddingLeft: 10, paddingTop: 6, width: 30, height: 30}} onPress={() => delFromCart(_id)}><Text style={{color:'#fff', fontWeight:"bold"}}>X</Text></Pressable>
            <View style={{ top: 65, right: 5}}>
                <Text style={styles.textClass}>Class: <Text style={styles.typeClass}>{type}</Text></Text>
            </View>
            <View style={{ top: 65, right: 20 }}>
                <Text style={styles.textPassengers}>Passengers: <Text style={styles.typeClass}>{passengers}</Text></Text>
            </View>
            {/*<Pressable onPress={() => suma()} style={{position: "absolute", left: 295, top: 164}}>
                <Text style={{fontSize: 28}}>+</Text>
            </Pressable>
            <Pressable onPress={() => resta()} style={{position: "absolute", left: 210, top: 164}}>
                <Text style={{fontSize: 28}}>-</Text>
            </Pressable>
            <View style={{ left: 250, top: 65, width: 30}}>
                <Text style={{fontSize: 28, fontWeight: "bold"}}>{modificarPasajeros}</Text>
        </View>*/}
        </View>
    )
}

//

export default CartItem