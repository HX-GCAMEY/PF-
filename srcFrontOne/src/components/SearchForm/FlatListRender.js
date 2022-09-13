import React from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import Loading from './Loading'
import NoMatch from './NoMatch'
import ListItem from './ListItem';
import flyMini from './img/flyMini.png'
import styles from './styles'
import { LinearGradient } from "expo-linear-gradient"

const FlatListRender = ({ flightsByRoute1, flightSuggestions, flightsByRoute, date, onCloseModal }) => {

  if (!flightsByRoute1) {
    return <Loading />
  }


  else if (flightsByRoute && flightsByRoute[0]?._id) {
    // console.log('2', flightsByRoute)
    return (
      <LinearGradient colors={['#8831d41d', '#07c5c505']} style={{ right: 10, width: 700, top: 16, marginBottom: 35 }}>
        <Image source={flyMini} style={{ alignSelf: 'center', marginTop: 10 }} />
        <FlatList
          data={flightsByRoute}
          renderItem={({ item }) => <ListItem item={item} onCloseModal={onCloseModal} />}
          keyExtractor={(item) => item._id}
        />
      </LinearGradient>
    )
  }

  else if (flightSuggestions) {
    // console.log('1', flightSuggestions)
    return (
      <LinearGradient colors={['#8831d41d', '#07c5c505']} style={{ right: 10, width: 700, top: 16, marginBottom: 80 }}>
        <Image source={flyMini} style={{ alignSelf: 'center', marginTop: 10 }} />
        <Text style={styles.suggestionText} >{flightsByRoute[0] ? '' : `no available flights for ${date.toISOString().slice(0, 10)}`}</Text>
        <Text style={styles.suggestionTextTwo} >{flightsByRoute[0] ? '' : `nearest flights from ${flightSuggestions[0].departure.date}`}</Text>
        <FlatList
          data={flightSuggestions}
          renderItem={({ item }) => <ListItem item={item} onCloseModal={onCloseModal} />}
          keyExtractor={(item) => item._id}
        />
      </LinearGradient>
    )
  }

  else return <NoMatch onCloseModal={onCloseModal} />

}


export default FlatListRender