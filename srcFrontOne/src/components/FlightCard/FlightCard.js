import React from "react";
import { Image, View, Text, Pressable } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import planeImage from "./plane2.png"
import styles from "./styles";
import { Button } from "native-base";
import { useNavigation } from '@react-navigation/native';
//import { addToCart } from "../../Redux/Actions/flights"; --> ADD TO CART DEL REDUCER?? --> en el button

const FlightCard = ({ key, departure, departureTime, destinationPlace, destinationTime, fare }) => {
    
    const navigation = useNavigation()

    //desarrollar un onPress para que cada vez q se toque el boton agregar al carrito lo haga
    //pasarle la data en la linea del navigation

    //onPress={() => addToCart({key})}
    
    return (
        <Pressable onPress={() => navigation.navigate('Detail')}>
            <LinearGradient colors={['#0188A2', '#30CECE']} style={styles.container}>
                <Text style={styles.departurePlace}>{departure}</Text>
                <Text style={styles.departureTime}>{departureTime}</Text>
                <Text style={styles.destinationPlace}>{destinationPlace}</Text>
                <Text style={styles.destinationTime}>{destinationTime}</Text>
                <Text style={styles.fare}>${fare}</Text>
                <Image source={planeImage} style={{resizeMode: "contain", flex: 5, width: 100, position: "absolute", bottom: -70, left: 60}}/>
                <Button>Add to Cart</Button>
                {/*<Button style={{width:80, height:20, borderRadius:15, flexDirection: 'row', position: "absolute", top: 75, left: 245}} title="NEXT" color="#0188A2"/>*/}    
            </LinearGradient>
        </Pressable>
    )
}

export default FlightCard;