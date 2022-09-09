import React from 'react'
import { Pressable, View, Text } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from '@react-navigation/native';
import styles from './styles'


const ListItem = ({ item }) => {
  const navigation = useNavigation()
  const { _id, departure, arrival, defaultFare, totalSeats, duration, number } = item;
  return (
    <Pressable
      key={item._id}
      style={styles.rendInput}
      onPress={() => navigation.navigate('Detail', {
        flyId: _id,
        departCity: departure.city,
        departAirport: departure.airport,
        departDate: departure.date,
        departTime: departure.time,
        departAirportCode: departure.airportCode,
        arrivalCity: arrival.city,
        arrivalAirport: arrival.airport,
        arrivalDate: arrival.date,
        arrivalTime: arrival.time,
        arrivalAirportCode: arrival.airportCode,
        backgroundImage: arrival.backgroundImage,
        flyNumber: number,
        totalSeats: totalSeats,
        duration: duration,
        defaultFare: defaultFare,
      })} >
      <LinearGradient colors={['#07C5C5', '#0184A0']} style={styles.container}>
        <View style={{ top: 0, left: 0, right: 0, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.date}>Date: {departure.date}</Text>
          <Text style={styles.departureCard}>Depart: {departure.airport}</Text>
          <Text style={styles.arrivalCard}>Arrival: {arrival.airport}</Text>
          <Text style={styles.price}>Price: $ {defaultFare}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  )
}


export default ListItem