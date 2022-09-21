import React, {useState} from "react";
import {View, Text, ScrollView} from "react-native";
import styles from "./styles";
import InputSignUp from "./InputSignUp/InputSignUp";
import ButtonLogin from "../Login/ButtonLogin/ButtonLogin";
import SocialButtons from "../Login/SocialButtons/SocialButtons";
import { firebase } from "../../../../firebase-config";
import axios from "axios";
import {LinearGradient} from "expo-linear-gradient";




const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async(email, password) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( () => {
            firebase.auth().currentUser.sendEmailVerification()
            .then(() => {
                alert("Verification email sent")
            }).catch((error) => {
                alert(error.message)
                console.log(error)

            })
            .then(() => {
                axios({
                    method: "POST",
                    url: "https://flymatepf.herokuapp.com/api/users/register",
                    data: {
                        email,
                        password
                    }
                })
                navigation.navigate("Login")
                
            })
            .catch((error) => {
                alert(error.message)
                console.log(error)
            })
        })
        .catch((error) => {
            alert(error.message)
            console.log(error)
        })
    }
    
    const onSignIn = () => {
        navigation.navigate("Login")
    }


    return (
        <LinearGradient colors={['#ffa333', '#07C5C5']} style={{height: '100%'}}>
        <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>
            <InputSignUp
                iconName="email-outline"
                placeholder="Enter your email address" 
                value={email} 
                setValue={(email) => setEmail(email)}
                />
              <InputSignUp
                iconName="onepassword"
                placeholder="Enter your password" 
                value={password} 
                setValue={(password) => setPassword(password)}
                password
                />    




            <ButtonLogin
                text="Register" 
                onPress={() => registerUser(email, password)} 
                />
            <SocialButtons />

            <ButtonLogin
                text="Do you have an account? Sign In"
                onPress={onSignIn}
                type="TERTIARY"
                />

        </View>
        </ScrollView>
        </LinearGradient>
    )
}


export default SignUp;