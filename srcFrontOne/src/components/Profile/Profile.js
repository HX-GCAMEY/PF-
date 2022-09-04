import React from "react";
import { View, Text } from "react-native";
import Flights from '../Flights/Flights'
import styles from "./styles";

const Profile = () => {
    return (
        <View style={styles.container}>
            <Flights />
        </View>
    )
}

export default Profile;