import styles from "./styles"
import React from "react"
import { View, Text, TouchableOpacity } from "react-native"



const ButtonLogin = ({onPress, text, type= "PRIMARY", bgColor, fgColor}) => {
    return(
        <TouchableOpacity   onPress={onPress}  style={[styles.container, styles[`container_${type}`], bgColor ? {backgroundColor: bgColor} : {}]}>
            <Text style={[styles.text, styles[`text_${type}`], fgColor ?  {color: fgColor} : {} ]}>{text}</Text>
        </TouchableOpacity>
        
        )
        
    }


export default ButtonLogin;

 
