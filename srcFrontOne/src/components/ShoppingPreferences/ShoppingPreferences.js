import React from "react";
import { View, Text, Button, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addToCart, getFlights } from "../../Redux/Actions/flights";
import { useRoute } from "@react-navigation/native";

const ShoppingPreferences = () => {

    const route = useRoute();

    const { flyId } = route.params; 

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const flights = useSelector((state) => state.flightsReducers.flights);
    const flightCart = useSelector((state) => state.flightsReducers.cart)

    useEffect(() => {
        dispatch(getFlights())
    }, [dispatch])

    const add = (flyId) => {
        dispatch(addToCart(flyId));
        navigation.navigate('ShoppingCart', {flyId: flyId})
    }

    //FALTA PASAR LOS VALORES QUE VAMOS A PASAR X FORM (cant de tickets - clase de los tickets)

    console.log(flightCart)

    return(
        <View>
            <Text>HOLA</Text>
            <Button title="COMPRAR AHORA" onPress={() => add(flyId)}/>
        </View>
    )
}

export default ShoppingPreferences