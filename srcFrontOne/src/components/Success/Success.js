import React from "react";
import { Text, View, Pressable, Dimensions, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import logo from "./img/Success.png"
import { useDispatch } from "react-redux";
import { clearCart } from "../../Redux/Actions/flights";

const Success = () => {

    const fullHeight = Dimensions.get('window').height;
    const fullWidth = Dimensions.get('window').width;

    const dispatch = useDispatch()

    const navigation = useNavigation();

    const back = () => {
        navigation.navigate('HomePage');
        dispatch(clearCart())
    }

    return(
        <LinearGradient colors={["#06C5C5", "#14366F"]} style={{width: fullWidth, height: fullHeight * 1.2}}>
            <Image source={logo} style={{width: 247, height: 247, position: "absolute", left: 70, top: 100}}/>
            <Text style={{color: "#FFFFFF", fontSize: 28, fontWeight: "bold", left: 82, top: 394}}>Payment Success</Text>
            <Text style={{color: "#FFFFFF", fontSize: 20, position: "absolute", left: 60, top: 440}}>Your payment was successful!</Text>
            <Text style={{color: "#FFFFFF", fontSize: 20, position: "absolute", left: 85, top: 470}}>Thanks for flight whit us</Text>
            <Pressable style={{
                backgroundColor: "#09ADB7", 
                borderRadius: 10, 
                position: "absolute", 
                left: 35, 
                top: 540, 
                width: 330, 
                height: 50,
                shadowColor: "#000",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                
                elevation: 4,
                }}>
                <Text style={{color: "#FFFFFF", fontSize: 16, fontWeight: "500", textAlign: "center", top: 12}}>See all my flights</Text>
            </Pressable>
            <Pressable onPress={() => back()} style={{
                backgroundColor: "#4E7799", 
                borderRadius: 10, 
                position: "absolute", 
                left: 35, 
                top: 630, 
                width: 330, 
                height: 50,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                
                elevation: 4,
                }}>
                <Text style={{color: "#FFFFFF", fontSize: 16, fontWeight: "500", textAlign: "center", top: 12}}>Back to home</Text>
            </Pressable>
        </LinearGradient>
    )
}

export default Success;