import React from 'react';
// import { View, Text } from 'react-native';
// import styles from './styles';
import FootBar from '../FootBar/FootBar';
// import HomePage from '../HomePage/HomePage';
// import About from '../About/About';
// import Profile from '../Profile/Profile';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


//store= conexion con redux
import store from "../../Redux/Store/index";
import { Provider } from "react-redux";

const configStore = store()


const Main = () => {
    // const Stack = createNativeStackNavigator()
    return (
        <Provider store={configStore}>
        <NavigationContainer>
           <FootBar />
        </NavigationContainer>
        </Provider>
    )
}

export default Main;