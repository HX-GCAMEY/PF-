import styles from "./styles"
import React from "react"
import { View, Text, Pressable } from "react-native"



const ButtonLogin = ({onPress, text, type= "PRIMARY", bgColor, fgColor}) => {
    return(
        <Pressable   onPress={onPress}  style={[styles.container, styles[`container_${type}`], bgColor ? {backgroundColor: bgColor} : {}]}>
            <Text style={[styles.text, styles[`text_${type}`], fgColor ?  {color: fgColor} : {} ]}>{text}</Text>
        </Pressable>
        
        )
        
    }


export default ButtonLogin;

 
