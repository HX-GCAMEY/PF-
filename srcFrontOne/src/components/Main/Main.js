import React from 'react';
import FootBar from '../FootBar/FootBar';
import LandingPage from '../LandingPage/LandingPage';
import Detail from '../Detail/Detail';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//////////////////////////////////////////////////////////////
import LoginScreen from '../Authentication/Login/LoginScreen';
import SignUp from '../Authentication/SignUp/SignUp';
import ForgotPassword from '../Authentication/ForgotPassword/ForgotPassword';


//store= conexion con redux
import store from "../../Redux/Store/index";
import { Provider, useSelector } from "react-redux";
import Inputs from '../Profile/Inputs/Inputs';



const configStore = store()

const Stack = createNativeStackNavigator()

// const Main = () => {
//     return (
//         <NavigationContainer>
//            <FootBar />
//         </NavigationContainer>
//     )
// }


const Auth = () => {
    
    return (
        <Provider store={configStore}>

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }}/>
                <Stack.Screen name="HomePage" component={FootBar}  options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
                <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }}/>
                <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{ headerShown: false }}/>
                <Stack.Screen name="EditProfile" component={Inputs} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}

export default Auth;