import React, {useState} from "react";
import {View, Text} from "react-native";
import styles from "./styles";
import InputSignUp from "../SignUp/InputSignUp/InputSignUp";
import ButtonLogin from "../Login/ButtonLogin/ButtonLogin";




const ConfirmEmail = ({navigation}) => {
    const [code, setCode] = useState('');

    
    const onConfirm = () => {
       navigation.navigate("Login")
    }

    const onSignIn = () => {
       navigation.navigate("Login")
    }

    const onResend = () => {
        console.warn('resend code')
    }


    return (

        <View style={styles.rootE}>
            <Text style={styles.title}>Confirm your Email</Text>
            <InputSignUp
                placeholder="Enter your confirmation code" 
                value={code} 
                setValue={setCode}
                />


            <ButtonLogin
                text="Confirm" 
                onPress={onConfirm} 
                />


            <ButtonLogin
                text="Resend code"
                onPress={onResend}
                type="SECONDARY"
                />
            <ButtonLogin
                text="Back to Sign In"
                onPress={onSignIn}
                type="TERTIARY"
                />




        </View>

    )
}


export default ConfirmEmail;