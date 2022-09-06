import React from "react";
import {View, Text, TextInput} from "react-native";
import styles from './styles';



const InputSignUp = ({value, setValue, placeholder, secureTextEntry}) => {
    return(
    <View style={styles.rootS}>
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


export default InputSignUp;