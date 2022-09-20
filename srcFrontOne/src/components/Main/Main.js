import React from 'react';
import FootBar from '../FootBar/FootBar';
import LandingPage from '../LandingPage/LandingPage';
import Detail from '../Detail/Detail';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import StripeApp from '../StripeApp/StripeApp';
import Success from '../Success/Success';
import ReviewForm from '../Review/ReviewForm'

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

import { StripeProvider } from '@stripe/stripe-react-native';

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
        <StripeProvider publishableKey='pk_test_51LhIf2E39QEUnGjnHqtOOo2ze8HLgYgKNOl5WmOWb83KDKXsugGSKTalJsup2mRSh0iGrCXuBF1VYmrBA8ewZcLu00MUbU6oCr'>
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
                    <Stack.Screen name="StripeApp" component={StripeApp} options={{ headerShown: false }}/>
                    <Stack.Screen name="Success" component={Success} options={{ headerShown: false }}/>
                    <Stack.Screen name="ReviewForm" component={ReviewForm} options={{ headerShown: false }}/>
                </Stack.Navigator>
            </NavigationContainer>
            </Provider>
         </StripeProvider>
)}

export default Auth;