import React from 'react';
import FootBar from '../FootBar/FootBar';
import Detail from '../Detail/Detail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



//////////////////////////////////////////////////////////////
import LoginScreen from '../Authentication/Login/LoginScreen';
import SignUp from '../Authentication/SignUp/SignUp';
import ForgotPassword from '../Authentication/ForgotPassword/ForgotPassword';


//store= conexion con redux
import store from "../../Redux/Store/index";
import { Provider } from "react-redux";



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
                    <Stack.Screen name="HomePage" component={FootBar} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default Auth;