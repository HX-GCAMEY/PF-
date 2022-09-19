import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../HomePage/HomePage";
import LoginScreen from '../Authentication/Login/LoginScreen'
import About from "../About/About";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";




const FootBarGuest = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarInactiveTintColor: '#fff',
      tabBarActiveTintColor: 'orange',
      tabBarActiveBackgroundColor: '#0183A0',
      tabBarStyle: { backgroundColor: '#018CA3' }
    }}>

      <Tab.Screen name="Home" component={HomePage} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" color={color} size={size} />
        )
      }} />

      <Tab.Screen name="About" component={About} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="information-circle-outline" color={color} size={size} />
        )
      }} />

      <Tab.Screen name="Profile" component={LoginScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="user" color={color} size={size} />
        )
      }} />
    </Tab.Navigator>
  )
}

export default FootBarGuest;