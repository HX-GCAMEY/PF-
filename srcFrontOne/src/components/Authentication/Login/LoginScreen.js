import React, {useEffect, useState} from "react";
import {Image, useWindowDimensions, View, Text, Keyboard} from "react-native";
import logo from "../../../images/flymateLogo.png";
import styles from "./styles";
import InputLogin from "./InputLogin/InputLogin";
import ButtonLogin from "./ButtonLogin/ButtonLogin";
import SocialButtons from "./SocialButtons/SocialButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { getUser } from "../../../Redux/Actions/users";
import {LinearGradient} from "expo-linear-gradient";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const findUser = useSelector((state) => state.userReducer.session)
    console.log("encontre a tu vieja",findUser)
    const dispatch = useDispatch();


   
    
    const {height} = useWindowDimensions();

    const login = async(email, password) => {
        return axios
          .post("https://flymatepf.herokuapp.com/api/users/login", { email, password})
          .then((response) => {
            if (response.data.auth_token) {
              AsyncStorage.setItem("user", JSON.stringify(response.data));
              console.log(response.data)
              dispatch(getUser(email))
              navigation.navigate("HomePage")
            }
            return response.data;
          })
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
        <LinearGradient colors={['#ffa333', '#07C5C5']} style={{height: '100%'}}>

        <View style={styles.rootLogin}>
            <Image source={logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain"  />

            <InputLogin 
                placeholder="Enter your email address"
                iconName="email-outline"
                value={email} 
                setValue={(email) => setEmail(email)}
                />
            <InputLogin 
                placeholder="Enter your password" 
                iconName="onepassword"
                value={password} 
                setValue={(password) => setPassword(password)}
                password
                />

            <ButtonLogin 
                text="Login" 
                onPress={() => login(email, password)} 
                />
               
            <SocialButtons />
           
            <ButtonLogin 
                text="Forgot Password?" 
                onPress={onForgotPasswordPress} 
                type="TERTIARY"
                />
            
            
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
        </LinearGradient>        
    )
}


export default LoginScreen;