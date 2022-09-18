import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Pressable, ScrollView, TouchableOpacity, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearCart, clearTickets, getFlights, postTicket, removeFromCart } from "../../Redux/Actions/flights";
import CartItem from "./CartItem";
import { useNavigation } from '@react-navigation/native';

const ShoppingCart = () => {

    const dispatch = useDispatch();

    //todos los elementos del carrito
    const flightCart = useSelector((state) => state.flightsReducers.cart);
    const tickets = useSelector((state) => state.flightsReducers.tickets);
    const {email} = useSelector((state) => state.userReducer.session);

    const [modalVisible, setModalVisible] = useState(false);
    
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(getFlights())
    }, [dispatch])

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
        passengers,
        type
    } = route.params;
    
    const del = (id) => {
        dispatch(removeFromCart(id))
    }

    const back = () => {
        //dispatch(clearCart());
        navigation.navigate('HomePage')
    }

    const shop = () => {
        navigation.navigate('StripeApp')
        //setModalVisible(!modalVisible);
    }

    const openModal = () => {
        setModalVisible(true)
    }

    const onCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <ScrollView>
            <Pressable onPress={() => back()} style={{width: 36, marginTop: 73, marginLeft: 34}}>
                <LinearGradient colors={["#06C5C5", "#0186A1"]} style={{borderRadius: 10}}>
                    <Ionicons name="chevron-back-outline" color="#FFFFFF" size={30}/>
                </LinearGradient>
            </Pressable>
            <Text style={{fontSize: 26, fontWeight: "bold", marginTop: 80, marginLeft: 36, marginBottom: 56}}>Shopping Cart</Text>
            {
                flightCart && flightCart.map((item, index) => {
                    return <CartItem data={item} key={index} id={index} delFromCart={del}/>
                })
            }

            {/* <Pressable onPress={() => send()}> */}
            <Pressable onPress={() => shop()}>
                <LinearGradient colors={['#06C5C5', '#06C5C5']} style={{width: 304, height: 42, borderRadius: 20, marginLeft: 60, marginTop: 20}}>
                    <Text style={{fontSize: 16, fontWeight: "bold", color:"#FFFFFF95", textAlign: "center", top: 8}}>Buy Now</Text>
                </LinearGradient>
            </Pressable>
            {/*<Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
            >
                <View style={{
                    backgroundColor: "#06C5C5", 
                    width: 400, 
                    height: 250, 
                    top: 535,
                    right: 2,
                    borderRadius: 40,
                    }}>
                    <View style={{left: 30, top: 30}}>
                        <TouchableOpacity onPress={() => onCloseModal()}>
                            <Ionicons name='close-circle-outline' color={'#FFFFFF90'} size={37}/>
                        </TouchableOpacity>
                    </View>
                </View>
                </Modal>*/}
        </ScrollView>
    )
}

export default ShoppingCart