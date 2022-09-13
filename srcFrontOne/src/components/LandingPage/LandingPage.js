import React from "react";
import { View, Image, Dimensions, Pressable } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import planeImage from "./logo.png";
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {

    const widthMax = Dimensions.get("window").width;
    const heightMax = Dimensions.get("window").height;

    const navigation = useNavigation();

    return(
        <Pressable onPress={() => navigation.navigate('HomePage')}>
            <LinearGradient colors={['#0188A2', '#30CECE']} style={{height: heightMax, width: widthMax}}>
                <Image source={planeImage} style={{resizeMode: "contain", marginTop: heightMax / 3, marginLeft: widthMax / 18}}/> 
            </LinearGradient>
        </Pressable>
    )
}

export default LandingPage