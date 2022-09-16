import React, {useState} from "react";
import {View, Text} from "react-native";
import styles from "./styles";
import InputSignUp from "../SignUp/InputSignUp/InputSignUp";
import ButtonLogin from "../Login/ButtonLogin/ButtonLogin";
import { firebase } from "../../../../firebase-config";
import {LinearGradient} from "expo-linear-gradient";



const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    


    const onSignIn = () => {
       navigation.navigate("Login")
    }


    const sendEmailResetPassword = async(email) => {
        await firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Check your email for reset your password")
            navigation.navigate('Login')
        })
        .catch((error) => {
            alert(error.message)
            console.log(error)
        })
    }


    return (
        <LinearGradient colors={['#ffa333', '#07C5C5']} style={{height: '100%'}}>
        <View style={styles.rootF}>
            <Text style={styles.title}>Reset your password</Text>


            <InputSignUp
                placeholder="Email" 
                value={email} 
                setValue={(email) => setEmail(email)}
                />


            <ButtonLogin
                text="Send" 
                onPress={() => sendEmailResetPassword(email)} 
                />

            <ButtonLogin
                text="Back to Sign In"
                onPress={onSignIn}
                type="TERTIARY"
                />




        </View>
        </LinearGradient>
    )
}


export default ForgotPassword;