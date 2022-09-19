import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Pressable, ScrollView, TouchableOpacity, Modal, Alert, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearCart, clearTickets, getFlights, postTicket, removeFromCart } from "../../Redux/Actions/flights";
import CartItem from "./CartItem";
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";

const ShoppingCart = () => {

    const dispatch = useDispatch();

    //todos los elementos del carrito
    const flightCart = useSelector((state) => state.flightsReducers.cart);
    const tickets = useSelector((state) => state.flightsReducers.tickets);
    const usuario = useSelector((state) => state.userReducer.session);

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
        navigation.navigate('HomePage')
    }

    const shop = () => {
        setModalVisible(!modalVisible);
    }

    const openModal = () => {
        setModalVisible(true)
    }

    const onCloseModal = () => {
        setModalVisible(false)
    }

    const goToPay = () => {
        if(usuario && usuario.email) navigation.navigate('StripeApp')
        else navigation.navigate('Login')
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
            <Pressable onPress={() => shop()}>
                <LinearGradient colors={['#06C5C5', '#06C5C5']} style={{width: 304, height: 42, borderRadius: 20, marginLeft: 60, marginTop: 20, marginBottom: 20}}>
                    <Text style={{fontSize: 16, fontWeight: "bold", color:"#FFFFFF90", textAlign: "center", top: 8}}>Confirm Payment</Text>
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
                <View style={{
                    backgroundColor: "#06C5C5", 
                    width: 400,
                    height: 440,
                    top: 300,
                    right: 2,
                    borderRadius: 40,
                    }}>
                    <View style={{left: 30, top: 30}}>
                        <TouchableOpacity onPress={() => onCloseModal()}>
                            <Ionicons name='close-circle-outline' color={'#FFFFFF90'} size={37}/>
                        </TouchableOpacity>
                    </View>
                    { flightCart.map((i, index) => {
                        return (
                        <View key={index}> 
                            <Text style={styles.resumenTitle}>Flight number: {i.number} </Text>    
                            <Text style={styles.resumen}>{i.passengers} passengers</Text>
                            <Text style={styles.resumenFare}>$ {i.defaultFare * i.passengers}</Text>
                            <Text style={styles.separacion}>-------------------------------</Text>
                        </View>
                        )
                    }) 
                    }
                    <Pressable onPress={() => goToPay()}>
                        <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.boton}>
                            <Text style={{fontWeight: "400", fontSize: 16, left: 85, top: 4}}>Proceed to checkout</Text>
                        </LinearGradient>
                    </Pressable>
                </View>     
            </Modal>
        </ScrollView>
    )
}

export default ShoppingCart