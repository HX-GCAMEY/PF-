import React from "react";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Button } from "react-native";

const FootBar = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Button style={styles.button} title="Home" onPress={() => navigation.navigate('Home')}>Home</Button>
                <Button style={styles.button} title="About" onPress={() => navigation.navigate('About')}>About</Button>
                <Button style={styles.button} title="Profile" onPress={() => navigation.navigate('Profile')}>Profile</Button>
            </ScrollView>
        </View>
    )
}

export default FootBar;