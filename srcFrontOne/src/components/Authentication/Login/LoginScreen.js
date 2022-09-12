import React, {useEffect, useState} from "react";
import {Image, useWindowDimensions, View, Button} from "react-native";
import logo from "../imgs/logo.png";
import styles from "./styles";
import InputLogin from "./InputLogin/InputLogin";
import ButtonLogin from "./ButtonLogin/ButtonLogin";
import SocialButtons from "./SocialButtons/SocialButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



  

    const {height} = useWindowDimensions();

    const login = async(email, password) => {
        return axios
          .post("https://flymatepf.herokuapp.com/api/users/login", { email, password})
          .then((response) => {
            if (response.data.auth_token) {
              AsyncStorage.setItem("user", JSON.stringify(response.data));
              console.log(response.data)

              navigation.navigate("HomePage")
            }
            return response.data;

          });
      };

    const onForgotPasswordPress = () => {
        navigation.navigate("ForgotPassword")
    }

    const onSignUp = () => {
        navigation.navigate("SignUp")
    }

    const onGuest = () => {
        alert("We recommend logging in for more facilities")
        navigation.navigate("HomePage")
        
    }

    return (
        <View style={styles.rootLogin}>
            <Image source={logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain"  />

            <InputLogin 
                placeholder="Email" 
                value={email} 
                setValue={(email) => setEmail(email)}
                />
            <InputLogin 
                placeholder="Password" 
                value={password} 
                setValue={(password) => setPassword(password)}
                secureTextEntry={true}
                />

            <ButtonLogin 
                text="Login" 
                onPress={() => login(email, password)} 
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
       
            <ButtonLogin
                text="Login as Guest"
                onPress={onGuest}
                type="FOURTH"
                />
        </View>
    )
}


export default LoginScreen;