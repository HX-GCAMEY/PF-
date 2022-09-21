import React, { useState } from 'react'
import { Pressable, View, Text, Image } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import avion from '../HomePage/img/backCard.jpg'
import { setFavorites, deleteFavorites } from '../../Redux/Actions/users';

const ListItem = ({ item, onCloseModal }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { _id, departure, arrival, defaultFare, totalSeats, duration, number } = item;
  const favState = useSelector((state) => state.userReducer.favorites);
  const [fav, setFav] = useState(false)

  const flightData = {
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
  }

  const searchById = favState.find(flight => flight.flyId === flightData.flyId)
  const submitFav = () => {
    setFav(!fav)
    if (!fav) {
      dispatch(setFavorites(flightData))
    }
    if (searchById) {
      dispatch(deleteFavorites(flightData.flyId))
    }
  }

  const navAndDelay = (e) => {
    setTimeout(() => {
      onCloseModal()
    }, 1000)
    navigation.navigate('Detail', flightData)
  }

  // console.log('en tu cara Marcelo\n\n', favState)
  return (
    <LinearGradient colors={['#8831d41d', '#07c5c505']} style={styles.gradientShadow} >
      <Pressable
        key={item._id}
        style={styles.rendInput}
        onPress={() => navAndDelay()} >
        <Image source={avion} style={styles.cardModal} />
        <View style={styles.viewCard}>
          <Text style={styles.airCodeText} >{departure.airportCode} → {arrival.airportCode} </Text>
          <Pressable
            onPress={() => submitFav()}
            style={{ left: 160, bottom: 30 }}
          >
            <Text style={styles.iconFavs} >{searchById ? '🧡' : '🖤'}</Text>
          </Pressable>
          <Text style={styles.date}>{departure.date}</Text>
          <Text style={styles.timeText} >{departure.time}</Text>
          <Text style={styles.departText} >↗ {departure.city}</Text>
          <Text style={styles.arrivalText} > {arrival.city} ↘</Text>
          {/* <Text style={styles.departureCard}>Available Seats: {totalSeats}</Text> */}
          <Text style={styles.arrivalCard}>Fly Duration: {duration}</Text>
          <Text style={styles.price}>${defaultFare.slice(0, 3) + "." + defaultFare.slice(3, 100)}</Text>
        </View>
      </Pressable>
    </LinearGradient>
  )
}


export default ListItem

