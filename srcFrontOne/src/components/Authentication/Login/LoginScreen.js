import React, {useState} from "react";
import {Image, useWindowDimensions, View} from "react-native";
import logo from "../imgs/logo.png";
import styles from "./styles";
import InputLogin from "./InputLogin/InputLogin";
import ButtonLogin from "./ButtonLogin/ButtonLogin";
import SocialButtons from "./SocialButtons/SocialButtons";



const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const onLoginPressed = () => {
        console.warn('Sign in')
    }
    const onForgotPasswordPress = () => {
        navigation.navigate("ForgotPassword")
    }

    const onSignUp = () => {
        navigation.navigate("SignUp")
    }


    return (
        <View style={styles.rootLogin}>
            <Image source={logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain"  />

            <InputLogin 
                placeholder="Email" 
                value={email} 
                setValue={setEmail}
                />
            <InputLogin 
                placeholder="Password" 
                value={password} 
                setValue={setPassword}
                secureTextEntry={true}
                />

            <ButtonLogin 
                text="Login" 
                onPress={onLoginPressed} 
                />
            <ButtonLogin 
                text="Forgot Password?" 
                onPress={onForgotPasswordPress} 
                type="TERTIARY"
                />
            
            <SocialButtons />
            
            <ButtonLogin
                text="Don't have an account? Sign Up"
                onPress={onSignUp}
                type="TERTIARY"
                />

        </View>
    )
}


export default LoginScreen;