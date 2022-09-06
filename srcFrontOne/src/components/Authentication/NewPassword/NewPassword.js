import React, {useState} from "react";
import {View, Text} from "react-native";
import styles from "./styles";
import InputSignUp from "../SignUp/InputSignUp/InputSignUp";
import ButtonLogin from "../Login/ButtonLogin/ButtonLogin";




const NewPassword = ({navigation}) => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('')
    
    const onSubmit = () => {
        console.warn('confirmed')
    }

    const onSignIn = () => {
        navigation.navigate("Login")
    }




    return (
        <View style={styles.rootP}>
            <Text style={styles.title}>Reset your password</Text>


            <InputSignUp
                placeholder="Code" 
                value={code} 
                setValue={setCode}
                />

            <InputSignUp
                placeholder="Enter your new password" 
                value={newPassword} 
                setValue={setNewPassword}
                />





            <ButtonLogin
                text="Submit" 
                onPress={onSubmit} 
                />

            <ButtonLogin
                text="Back to Sign In"
                onPress={onSignIn}
                type="TERTIARY"
                />




        </View>
    )
}


export default NewPassword;