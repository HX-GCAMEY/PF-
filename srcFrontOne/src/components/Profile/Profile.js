import React from "react";
import { View, Image, Button } from "react-native";
import styles from "./styles";
import {firebase} from "../../../firebase-config";
// import {Avatar} from "react-native-elements"





const Profile = ({navigation}) => {
    
    
    const signOut = async () => {
        await firebase.auth().signOut()
        .then(() => {
            alert("Sesion cerrada")
            navigation.navigate("Home")
        })
    }



    return (
        <View style={styles.container}>
            {/* <Avatar
                rounded
                size="large"
                containerStyle={styles.avatar}
                source={
                    user.photoURL
                    ? {uri: photoURL}
                    : require("./avatarDefault.png")
                }
            /> */}
           <Button
                title="Log out" 
                onPress={() => signOut()}
           />
        </View>
    )
}

export default Profile;