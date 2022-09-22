import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import avion from "./img/backCard.jpg"
import card from './img/cardT.jpg'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { deleteFavorites, postFavorites, getFavorites } from '../../Redux/Actions/users'


const CardsFavorites = ({ item }) => {
  const favState = useSelector((state) => state.userReducer.favorites);
  const { email } = useSelector((state) => state.userReducer.session);
  const dispatch = useDispatch()

  const navigation = useNavigation()
  const {
    flyId,
    departCity,
    departAirport,
    departDate,
    departTime,
    departAirportCode,
    arrivalCity,
    arrivalAirport,
    arrivalDate,
    arrivalTime,
    arrivalAirportCode,
    backgroundImage,
    flyNumber,
    totalSeats,
    duration,
    defaultFare
  } = item;

  const onCloseFav = async () => {
    dispatch(deleteFavorites(flyId))
    let dataToDb = await favState.length === 1 ? [] : favState
    if (email) {
      dispatch(postFavorites(email, dataToDb))
      // dispatch(getFavorites(email))
    }
  }

  const nav = () => {
    navigation.navigate('Detail', {
      flyId,
      departCity,
      departAirport,
      departDate,
      departTime,
      departAirportCode,
      arrivalCity,
      arrivalAirport,
      arrivalDate,
      arrivalTime,
      arrivalAirportCode,
      backgroundImage,
      flyNumber,
      totalSeats,
      duration,
      defaultFare,
    })
  }

  return (
    <Pressable onPress={() => nav()} style={styles.containerCards}>
      <View style={styles.imagenContainer}>
        <Image source={card} style={[styles.cardContainerr, { height: 265 }]} />
        <View style={styles.cardViewStyle}>
          <TouchableOpacity style={styles.cardViewStyleClose} onPress={onCloseFav}>
            <Ionicons name='close-circle' color={'#eeb775'} size={46} />
          </TouchableOpacity>
          <Text style={styles.departCityCard}> ↗ {departCity}</Text>
          <Text style={styles.arrival}> ↷ {arrivalCity}</Text>
          <Text style={styles.textDep}>Departure</Text>
          <Text style={styles.dateCard}>{departDate}</Text>
          <Text style={styles.timeCard}>{departTime}</Text>
          <Text style={styles.textArr}>Arrival</Text>
          <Text style={styles.dateCardArrival}>{arrivalDate}</Text>
          <Text style={styles.timeCardArrival}>{arrivalTime}</Text>
          <Text style={styles.price}>$ {defaultFare.slice(0, 3) + "." + defaultFare.slice(3, 100)}</Text>
          <Text style={styles.duration}>• Duration: {duration}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default CardsFavorites;