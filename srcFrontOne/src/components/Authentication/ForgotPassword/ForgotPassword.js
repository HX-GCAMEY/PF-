import React, {useState} from "react";
import {View, Text} from "react-native";
import styles from "./styles";
import InputSignUp from "../SignUp/InputSignUp/InputSignUp";
import ButtonLogin from "../Login/ButtonLogin/ButtonLogin";




const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    
    const onSend = () => {
       navigation.navigate("NewPassword")
    }

    const onSignIn = () => {
       navigation.navigate("Login")
    }




    return (
        <View style={styles.rootF}>
            <Text style={styles.title}>Reset your password</Text>


            <InputSignUp
                placeholder="Email" 
                value={email} 
                setValue={setEmail}
                />


            <ButtonLogin
                text="Send" 
                onPress={onSend} 
                />

            <ButtonLogin
                text="Back to Sign In"
                onPress={onSignIn}
                type="TERTIARY"
                />




        </View>
    )
}


export default ForgotPassword;