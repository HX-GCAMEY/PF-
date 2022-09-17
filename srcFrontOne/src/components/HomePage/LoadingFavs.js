import React, { useEffect, useRef } from 'react'
import { Text, View, Image, Animated, SafeAreaView } from 'react-native'
import logo from '../SearchForm/img/flyWithUs.png'
import gif from '../SearchForm/img/loadingGif.gif'
import styles from './styles'
import youWillSee from './img/youWillSee.png'
import favoritesHere from './img/favoritesHere.png'


const LoadingFavs = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;


  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      delay: 0,
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }
  fadeIn()

  return (
    <SafeAreaView>
      <View>
        <Animated.View
          style={[
            styles.fadingContainer,
            { opacity: fadeAnim }]}>
          <Image source={youWillSee} style={styles.imageSeeFavs} />
          <View style={styles.imgBorder} >
            <Image source={gif} style={styles.profilePicture} />
          </View>
          <Image source={favoritesHere} style={styles.favoritesHere} />
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

export default LoadingFavs