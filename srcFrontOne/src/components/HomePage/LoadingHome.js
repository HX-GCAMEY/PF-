import React, { useEffect, useRef } from 'react'
import { Text, View, Image, Animated, SafeAreaView, Button } from 'react-native'
import loadingLogo from '../SearchForm/img/loading.png'
import gif from '../SearchForm/img/loadingGif.gif'
import styles from './styles'

const LoadingHome = ({ onCloseModal }) => {
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
    <View>
      <View style={{ position: 'absolute', marginTop: 20, }}>
        <Animated.View
          style={[
            styles.fadingContainer,
            { opacity: fadeAnim }]}>
          <Image source={loadingLogo} style={styles.loadingLogo} />
        </Animated.View>
      </View>
      <View style={styles.imgBorderHome} >
        <Image source={gif} style={styles.profilePicture} />
      </View>
    </View>
  )
}

export default LoadingHome