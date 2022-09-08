import React, {useState} from "react";
import {View, Text} from "react-native";
import styles from "./styles";
import InputSignUp from "../SignUp/InputSignUp/InputSignUp";
import ButtonLogin from "../Login/ButtonLogin/ButtonLogin";
import { firebase } from "../../../../firebase-config";



const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    


    const onSignIn = () => {
       navigation.navigate("Login")
    }


    const sendEmailResetPassword = async(email) => {
        await firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Verify your email to change the password, also check spam")
            navigation.navigate('Login')
        })
        .catch((error) => {
            alert(error.message)
            console.log(error)
        })
    }


    return (
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
    )
}


export default ForgotPassword;