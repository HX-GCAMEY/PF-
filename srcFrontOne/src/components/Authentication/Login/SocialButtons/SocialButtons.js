import React, {useEffect, useState} from "react";
import ButtonLogin from "../ButtonLogin/ButtonLogin";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Image, View, Text } from "react-native";

WebBrowser.maybeCompleteAuthSession();


const SocialButtons = ({navigation}) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "803324446340-rru9e293vrsl0vku9te6lfcqp67j261d.apps.googleusercontent.com",
        androidClientId: "803324446340-826d6c268hqd7i2jgtpcgf0jljol59pd.apps.googleusercontent.com"
    });

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

    const ShowUserInfo = () => {
        if(user){
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 35, fontWeight: 'bold'}}>welcome</Text>
                <Image source={{uri: user.picture}} style={{width: 100, height: 80}}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
            </View>
        }
    }

    // const onLoginGoogle = () => {

    // }


    return(
    <>
        {user && <ShowUserInfo />}
        {user === null &&
        <ButtonLogin 
            text="Sign In with Google" 
            onPress={() => {promptAsync()}}
            type="GOOGLE"
            bgColor="#FAE9E4"
            fgColor="#DD4D44"
                        />
        
        }

    </>

    )
}


export default SocialButtons;