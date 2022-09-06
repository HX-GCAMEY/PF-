import React from "react";
import ButtonLogin from "../ButtonLogin/ButtonLogin";


const SocialButtons = () => {

    const onLoginFacebook = () => {
        console.warn("Sign in with facebook")
    }
    
    const onLoginGoogle = () => {
        console.warn("sign with google")
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
                onPress={onLoginGoogle}
                type="GOOGLE"
                bgColor="#FAE9E4"
                fgColor="#DD4D44"
                />
    </>

    )
}


export default SocialButtons;