import React, {useState} from "react";
import {View, Text, TextInput} from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const InputLogin = ({value, password, iconName, setValue, placeholder, error}) => {
    const [hidePassword, setHidePassword] = useState(password)



    return(
    <View style={[styles.rootL, {borderColor: error ? 'red' : '#ffa333'}]} >
        <Icon name={iconName} size={22} style={styles.iconInput} />
        <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={hidePassword} 
            style={styles.inputLogin}
            />
        {password && (
            <Icon
                onPress={() => setHidePassword(!hidePassword)}
                size={22}
                style={styles.eyePassword}
                name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            />
        )}
        
    </View>

    )
}


export default InputLogin;