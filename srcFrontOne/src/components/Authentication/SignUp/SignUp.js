import React, {useState} from "react";
import {View, Text} from "react-native";
import styles from "./styles";
import InputSignUp from "./InputSignUp/InputSignUp";
import ButtonLogin from "../Login/ButtonLogin/ButtonLogin";
import SocialButtons from "../Login/SocialButtons/SocialButtons";
import {firebase} from "../../../../firebase-config";


const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
    const onRegister = async (email, password) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://flymate-a11b8.firebaseapp.com'
            })
            .then(() => {
                alert("Email verification sent")
                navigation.navigate("ConfirmEmail")
            })
            .catch((error) => {
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    email,
                    password
                })
            })
            .catch((error) => {
                alert(error.message)
            })
         
        })
        .catch((error) => {
            alert(error.message)
        })
       
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
                onPress={() => onRegister(email, password)} 
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