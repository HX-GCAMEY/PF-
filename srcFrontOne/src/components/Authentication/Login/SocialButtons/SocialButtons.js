import React, {useEffect, useState} from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Image, View, Text, TouchableOpacity } from "react-native";
import google from "../../imgs/google.png";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getUser, googleLogin} from "../../../../Redux/Actions/users";
import styles from "../styles";

WebBrowser.maybeCompleteAuthSession();


const SocialButtons = ({navigation}) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const userDb = useSelector((state) => state.userReducer.session)
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "803324446340-rru9e293vrsl0vku9te6lfcqp67j261d.apps.googleusercontent.com",
        androidClientId: "803324446340-826d6c268hqd7i2jgtpcgf0jljol59pd.apps.googleusercontent.com",
        
    });
    const dispatch = useDispatch()

    useEffect(() => {
        if(response?.type === "success"){
            setAccessToken(response.authentication.accessToken)
            accessToken && fetchUserInfo();
        }
    }, [response, accessToken])

    async function fetchUserInfo  () {
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const useInfo = await response.json();
        setUser(useInfo)
       
    }


    

    async function registerGoogle(email){
        axios({
            method: "POST",
            url: "https://flymatepf.herokuapp.com/api/users/googleRegister", 
            data: {
                email
            },
        }).then((response) => {
                dispatch(getUser(email))
                console.log(response)
           }).catch((error) => {
            console.log(error.response)
           })
            }

    const loginGoogle = (email) => {
        axios({
            method: 'POST',
            url: "https://flymatepf.herokuapp.com/api/users/googleLogin",
            data: {
                email
            }
        }).then(() => {
            dispatch(getUser(email))
        })
        .catch((error) => {
            console.log(error)
        })
    }
    

    const ShowUserInfo = () => {
        if(user && !userDb){
            console.log('user de google', user)
            registerGoogle(user.email)

        } else {
            loginGoogle(user.email)
        }
    }



    return(
    <>
        {user && <ShowUserInfo />}
        {user === null &&
            <TouchableOpacity onPress={() => promptAsync()}>
                <Image source={google} style={styles.btnGoogle} />
                <Text style={styles.googleText}>Sign In with Google</Text>
            </TouchableOpacity>
        
        }

    </>

    )
}


export default SocialButtons;