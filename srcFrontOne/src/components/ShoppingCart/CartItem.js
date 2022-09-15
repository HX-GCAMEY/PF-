import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, Image } from "react-native";
import { Picker } from '@react-native-picker/picker';
import imagePrueba from "./img/foto-prueba.jpg"
import baggages from "./img/baggages.png"
import { setTicket } from "../../Redux/Actions/flights";

const CartItem = ({ data, delFromCart }) => {

    //const email = useSelector((state) => state.userReducer.session);
    const tickets = useSelector((state) => state.flightsReducers.tickets);

    const [clase, setClase] = useState('Flight Class');
    const [ticket, setTicket] = useState({
        clase: '',
        _id: '',
        email: ''
    })

    let { _id, arrival, departure, duration, number, totalSeats, defaultFare } = data;

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
            <Text style={{fontSize:26, fontWeight: "bold", marginLeft: 190, marginTop: 15}}>{departure.airportCode} - {arrival.airportCode}</Text>
            <Text style={{marginLeft: 190, marginTop: 5, fontSize: 15}}>date:     {departure.date}</Text>
            <Text style={{marginLeft: 190, marginTop: 10, fontSize: 17, fontWeight: "bold"}}>${defaultFare}</Text>
            <Image source={baggages} style={{resizeMode: "contain", height: 40, width: 90, marginLeft: 190, position: "absolute", top: 73, left: 60}}/>
            {/*<Button title="X" onPress={() => delFromCart(_id)}/>*/}
            <Picker
            selectedValue = {clase}
            onValueChange = {(itemValue, itemIndex) => {
                setClase(itemValue)
                let ticket = {
                    clase: itemValue,
                    _id: _id,
                    email: "marce@gmail.com"
                }
                console.log(ticket)
            }}
            style = {{ width: 163, marginLeft: 180, marginTop: 10}}
            >
                <Picker.Item label="Flight Class" value="Flight Class"/>
                <Picker.Item label="Basic" value="Basic"/>
                <Picker.Item label="Business" value="Business"/>
                <Picker.Item label="Premium" value="Premium"/>
            </Picker>
        </View>
    )
}

export default CartItem