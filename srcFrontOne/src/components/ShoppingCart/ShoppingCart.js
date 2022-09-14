import React from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Button, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearCart, getFlights, removeFromCart } from "../../Redux/Actions/flights";
import CartItem from "./CartItem";

const ShoppingCart = () => {

    const dispatch = useDispatch();
    const flights = useSelector((state) => state.flightsReducers.flights);
    const flightCart = useSelector((state) => state.flightsReducers.cart)

    useEffect(() => {
        dispatch(getFlights())
    }, [dispatch])

    const route = useRoute();
    const {flyId, passengers} = route.params;

    const del = (id) => {
        dispatch(removeFromCart(id))
    }

    const clear = () => {
        dispatch(clearCart())
    }

    return (
        <ScrollView>
            <Text>Carrito de Compras</Text>
            {
                flightCart && flightCart.map((item, index) => {
                return <CartItem data={item} key={index} delFromCart={del}/>})
            }
            <Pressable onPress={() => clear()}>
                    <LinearGradient colors={['#06C5C5', '#06C5C5']} style={{width: 304, height: 42, borderRadius: 20, marginLeft: 60, marginTop: 20}}>
                            <Text style={{fontSize: 16, fontWeight: "bold", color:"#FFFFFF95", textAlign: "center", top: 8}}>Buy Now</Text>
                    </LinearGradient>
                </Pressable>
        </ScrollView>
    )
}

export default ShoppingCart