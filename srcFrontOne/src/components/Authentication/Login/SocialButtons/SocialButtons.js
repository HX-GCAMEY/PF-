import React, {useEffect, useState} from "react";
import ButtonLogin from "../ButtonLogin/ButtonLogin";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Image, View, Text } from "react-native";
import google from "../../imgs/google.png";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import {useDispatch} from "react-redux";
import {getUser, googleLogin} from "../../../../Redux/Actions/users";
import styles from "../styles";

WebBrowser.maybeCompleteAuthSession();


const SocialButtons = ({navigation}) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
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
        }).then(() => {
           axios.post('https://flymatepf.herokuapp.com/api/users/googleLogin', {
            email
           }, {
            headers: {
                'Content-Type': 'application/json'
            }
           }).then((response) => {
                dispatch(getUser(email))
                console.log(response)
           }).catch((error) => {
            console.log(error.response)
           })
        })
    .catch((error) => {
        console.log(error)
    })
    }

    

    const ShowUserInfo = () => {
        if(user){
            console.log('user de google', user)
            registerGoogle(user.email)
            return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 35, fontWeight: 'bold'}}>welcome</Text>
                <Image source={{uri: user.picture}} style={{width: 100, height: 80}}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
            </View>

            )
        }
    }



    return(
    <>
        {user && <ShowUserInfo />}
        {user === null &&
        <AntDesign
            onPress={() => promptAsync()}
            name="google"
            size={20}
            style={styles.btnGoogle}
            />
        
        }

    </>

    )
}


export default SocialButtons;