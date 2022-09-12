import React from 'react'
import { Pressable, View, Text, Image } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import avion from '../HomePage/img/backCard.jpg'


const ListItem = ({ item, onCloseModal, fav, setFav }) => {
  const navigation = useNavigation()

  const setFavorites = (item) => {
    if (fav.includes(item._id)) {
      setFav(fav.splice(indexOf(item._id), 1, ""))
    } else {
      setFav(...fav, item._id)
    }
  }

  const delay = (e) => {
    setTimeout(() => {
      onCloseModal()
    }, 1000)

    navigation.navigate('Detail', {
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
    })
  }

  const { _id, departure, arrival, defaultFare, totalSeats, duration, number } = item;
  return (
    <LinearGradient colors={['#FFFFFF00', '#FFFFFF00']} style={styles.gradientShadow} >
      <Pressable
        key={item._id}
        style={styles.rendInput}
        onPress={() => delay()} >
        <Image source={avion} style={styles.cardModal} />
        <View style={styles.viewCard}>
          <Text style={styles.airCodeText} >{departure.airportCode} → {arrival.airportCode} </Text>
          {/* <Pressable onPress={(item) => setFavorites(item)} style={{ left: 160, bottom: 30 }} ><Text>{fav === item._id ? '🧡' : '🖤'}</Text></Pressable> */}
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

