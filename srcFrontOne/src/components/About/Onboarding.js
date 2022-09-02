import React from "react";
import { View, Text,  Image,  useWindowDimensions} from "react-native";
import styles from "./styles";
import {LinearGradient} from "expo-linear-gradient";


const Onboarding = ({item}) => {
    
    const { width } = useWindowDimensions();


    return (
        <LinearGradient colors={['#07C5C5', '#0184A0']}>
        <View style={styles.container}>

            <Image source={item.image} style={[styles.image, {width}]} />
        
        <View style={{flex: 0.3}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.description}>{item.subtitle}</Text>
            <Text style={styles.description}>{item.subtitle2}</Text>
        </View>
        
        </View>
        </LinearGradient>
    )
}



export default Onboarding;