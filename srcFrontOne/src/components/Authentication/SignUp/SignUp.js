import React, {useState} from "react";
import {View, Text, ScrollView} from "react-native";
import styles from "./styles";
import InputSignUp from "./InputSignUp/InputSignUp";
import ButtonLogin from "../Login/ButtonLogin/ButtonLogin";
import SocialButtons from "../Login/SocialButtons/SocialButtons";
import { firebase } from "../../../../firebase-config";
import axios from "axios";




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
                    url: "http://10.208.5.26:5000/api/users/register",
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
        <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>
            <InputSignUp
                placeholder="Email" 
                value={email} 
                setValue={(email) => setEmail(email)}
                />
              <InputSignUp
                placeholder="Password" 
                value={password} 
                setValue={(password) => setPassword(password)}
                secureTextEntry={true}
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
    )
}


export default SignUp;