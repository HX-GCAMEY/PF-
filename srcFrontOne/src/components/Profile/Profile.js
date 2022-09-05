import React from "react";
import { View, Image } from "react-native";
import errors from "./errors.png";
import styles from "./styles";

const Profile = () => {
    return (
        <View style={styles.container}>
            <Image source={errors} style={styles.imageProfile} />
        </View>
    )
}

export default Profile;