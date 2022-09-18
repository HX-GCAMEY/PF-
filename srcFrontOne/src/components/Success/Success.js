import React from "react";
import { Text, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Success = () => {

    const navigation = useNavigation();

    const back = () => {
        navigation.navigate('HomePage')
    }

    return(
        <View>
        <Pressable onPress={() => back()} style={{width: 36, marginTop: 83, marginLeft: 34}}>
            <LinearGradient colors={["#06C5C5", "#0186A1"]} style={{borderRadius: 10}}>
                <Ionicons name="chevron-back-outline" color="#FFFFFF" size={30}/>
            </LinearGradient>
        </Pressable>
        <LinearGradient colors={['#06C5C5', '#06C5C5']} style={{width: 304, height: 100, borderRadius: 20, marginLeft: 45, marginTop: 260}}>
                <Text style={{fontSize: 20, fontWeight: "bold", color:"#FFFFFF", textAlign: "center", top: 35}}>Successful purchase</Text>
            </LinearGradient>
        </View>
    )
}

export default Success;