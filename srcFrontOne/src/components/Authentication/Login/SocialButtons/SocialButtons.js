import React from "react";
import ButtonLogin from "../ButtonLogin/ButtonLogin";


const SocialButtons = () => {

    const onLoginFacebook = () => {
        console.warn("Sign in with facebook")
    }
    
    const onLoginGoogle = () => {
        console.warn("sign with google")
    }

   const googleLogin = async () => {
        try {
          const result = await Expo.Google.logInAsync({
            androidClientId: "803324446340-u7n45evcrguik3ht0nnb9tcrr57p2tsp.apps.googleusercontent.com",
            //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
            scopes: ["password", "email"]
  
          })
          if (result.type === "success") {
            const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
               firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(result){
                 console.log(result);
               });
       navigation.navigate('HomePage');
     } else {
       console.log("cancelled")
     }
        } catch (e) {
          console.log("error", e)
        }
    }

    return(
    <>


            <ButtonLogin 
                text="Sign In with Facebook" 
                onPress={onLoginFacebook} 
                type="FACEBOOK"
                bgColor=""
                fgColor="#4765A9"
                />

            <ButtonLogin 
                text="Sign In with Google" 
                onPress={() => googleLogin()}
                type="GOOGLE"
                bgColor="#FAE9E4"
                fgColor="#DD4D44"
                />
    </>

    )
}


export default SocialButtons;