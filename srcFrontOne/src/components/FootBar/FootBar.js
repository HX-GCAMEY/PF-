import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FootBarGuest from "./FootbarGuest";
import FootBarSession from "./FootBarSession";

const FootBar = () => {
    const user = useSelector((state) => state.userReducer.session)

    return(
        <>
        {user.email ? <FootBarSession /> : <FootBarGuest/>}
        </>

    )



}

export default FootBar