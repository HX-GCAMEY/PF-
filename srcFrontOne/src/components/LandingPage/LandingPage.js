import React, { useEffect } from "react";
import { View, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import planeImage from "./logo.png";
import * as Animatable from "react-native-animatable";


const LandingPage = ({navigation}) => {

    
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('HomePage')
        }, 2000);
    })
    return (
        <Animatable.View animation="fadeInDownBig">
            <LinearGradient colors={['#0188A2', '#30CECE']} style={{ height: '100%'}}>
                <Image source={planeImage} style={{marginTop: 150}} />

            </LinearGradient>


        </Animatable.View>

        
    )
}

export default LandingPage