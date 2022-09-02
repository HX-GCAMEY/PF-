import React from "react";
import { View, Text } from "react-native";
import SearchForm from "../SearchForm/SearchForm"
import styles from "./styles";

const HomePage = () => {
    return (
        <View style={styles.container}>
            <SearchForm />
        </View>
    )
}

export default HomePage;