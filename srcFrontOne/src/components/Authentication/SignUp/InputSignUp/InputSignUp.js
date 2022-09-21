import React, {useState} from "react";
import {View, Text, TextInput} from "react-native";
import styles from './styles';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const InputSignUp = ({value, password, iconName, setValue, placeholder}) => {
    const [hidePassword, setHidePassword] = useState(password)
    
    return(
    <View style={styles.rootS}>
        <Icon name={iconName} size={22} style={styles.iconUp} />
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={hidePassword} 
            style={styles.inputSignUp}
            />
        {password && (
            <Icon
                onPress={() => setHidePassword(!hidePassword)}
                size={22}
                style={styles.eyePassword2}
                name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            />
        )}
        
    </View>

    )
}


export default InputSignUp;