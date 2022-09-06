import React, {useState} from "react";
import {View, Text} from "react-native";
import styles from "./styles";
import InputSignUp from "./InputSignUp/InputSignUp";
import ButtonLogin from "../Login/ButtonLogin/ButtonLogin";
import SocialButtons from "../Login/SocialButtons/SocialButtons";



const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    
    const onRegister = () => {
        navigation.navigate("ConfirmEmail")
    }

    const onSignIn = () => {
        navigation.navigate("Login")
    }


    return (
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>
            <InputSignUp
                placeholder="Email" 
                value={email} 
                setValue={setEmail}
                />
            <InputSignUp
                placeholder="Username" 
                value={username} 
                setValue={setUsername}
                secureTextEntry={true}
                />
              <InputSignUp
                placeholder="Password" 
                value={password} 
                setValue={setPassword}
                secureTextEntry={true}
                />    
              <InputSignUp
                placeholder="Repeat password" 
                value={passwordRepeat} 
                setValue={setPasswordRepeat}
                secureTextEntry={true}
                />



            <ButtonLogin
                text="Register" 
                onPress={onRegister} 
                />
            <SocialButtons />

            <ButtonLogin
                text="Do you have an account? Sign In"
                onPress={onSignIn}
                type="TERTIARY"
                />

        </View>
    )
}


export default SignUp;