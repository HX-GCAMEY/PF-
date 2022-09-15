import React from "react";
import { View, Text, Image, Dimensions, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import avion from "./img/backCard.jpg"
import card from './img/cardT.jpg'
import gif from '../SearchForm/img/loadingGif.gif'


const CardNews = ({ item }) => {
  const navigation = useNavigation()

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;


  const ANCHO_CONTENEDOR = width * 0.7;
  const ESPACIO = 10;

  if (!item) {
    return (
      <View>
        <Image source={gif} style={styles.profilePicture} />
      </View>
    )
  }
  else {
    return (
      <Pressable style={styles.containerCards}>
        <View style={styles.imagenContainer}>
          <Image source={{ uri: item.background }} style={[styles.imageCardNews, { height: ANCHO_CONTENEDOR * 0.9 }]} />
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ backgroundColor: '#252440a5', width: '86%', top: 30, borderRadius: 7, paddingTop: 5, paddingLeft: 10 }} >
              <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', bottom: 5 }} >{item.title}</Text>
              <Text style={{ color: '#9febf5', alignSelf: 'center', bottom: 5 }} >{item.text}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    )
  }
}



export default CardNews;