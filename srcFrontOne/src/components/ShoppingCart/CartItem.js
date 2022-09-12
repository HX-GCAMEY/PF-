import React from "react";
import { View, Text, Button, Image } from "react-native";

import image from "./LogoColor.png";
import codigo from "./codigoBarra.png";

const CartItem = ({ key, data, delFromCart }) => {

    let { _id, arrival, departure, duration, number, totalSeats  } = data;

    return( 
        <View>
        <View style={{
            height: 193,
            width: 357,
            padding: 20,
            margin: 20,
            borderRadius: 10,
            backgroundColor: "#0399AB20",
            }}>
            <Image source={image} style={{resizeMode: "contain", height: 37, right: 100}}/>
            <Text style={{fontSize: 20, position: "absolute", margin: 25, marginLeft: 86}}>FLYMATE</Text>
            <Text style={{fontSize: 24, fontWeight: "bold", position: "absolute", top: 65, left: 46}}>{arrival.time}</Text>
            <Text style={{fontSize: 24, fontWeight: "bold", position: "absolute", top: 65, left: 163}}>{arrival.date}</Text>
            <Text style={{fontSize: 24, fontWeight: "bold", left: 163, position: "absolute", top: 95}}>{arrival.airportCode}  to  {departure.airportCode}</Text>
            <Text style={{position: "absolute", top: 123, left: 40}}>Flight Number</Text>
            <Text style={{position: "absolute", fontSize: 20, fontWeight: "bold", top: 143, left: 55}}>{number}</Text>
            <Image source={codigo} style={{resizeMode: "contain", height: 39, position: "absolute", left: 156, top: 138}}/>
            {/*<Button title="X" onPress={() => delFromCart(_id)}/>*/}
        </View>
        <View style={{backgroundColor: "#0399AB"}}></View>
        </View>
    )
}

export default CartItem