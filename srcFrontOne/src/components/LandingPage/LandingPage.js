import React, { useEffect, useRef } from "react";
import { View, Image, Pressable, Animated, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import planeImage from "./logo.png";
import * as Animatable from "react-native-animatable";
import logo from '../SearchForm/img/logos.png'

const LandingPage = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('HomePage')
        }, 3000);
    })

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            delay: 1000,
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }
    fadeIn()

    const goHome = () => {
        navigation.navigate('HomePage')
    }

    return (
        <View style={{ backgroundColor: '#0188A2' }} >
            <Image source={logo} style={{ position: 'absolute', top: 450, left: 60 }} />
            <Animatable.View animation="fadeInDownBig">
                <LinearGradient colors={['#0188A2', '#30CECE']} style={{ height: '100%' }}>
                    <Animated.View
                        style={{ opacity: fadeAnim }}>
                        <Pressable onPress={goHome}>
                            <Image
                                source={planeImage}
                                style={{ top: 190, position: 'absolute' }} />
                        </Pressable>
                    </Animated.View>
                </LinearGradient>
            </Animatable.View>
        </View>
    )
}

export default LandingPage


