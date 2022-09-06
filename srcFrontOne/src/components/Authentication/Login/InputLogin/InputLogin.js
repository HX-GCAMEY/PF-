import React from "react";
import {View, Text, TextInput} from "react-native";
import styles from "./styles";



const InputLogin = ({value, setValue, placeholder, secureTextEntry}) => {
    return(
    <View style={styles.rootL}>
        <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry} 
            style={styles.inputLogin}
            />
    </View>

    )
}


export default InputLogin;