import React, { useEffect, useRef } from 'react'
import { Text, View, Image, Animated, SafeAreaView, Button } from 'react-native'
import logo from '../SearchForm/img/flyWithUs.png'
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
    <View style={{ position: 'absolute' }} >
      <View style={{ position: 'absolute' }}>
        <Animated.View
          style={[
            styles.fadingContainer,
            { opacity: fadeAnim }]}>
          <Text style={styles.textLoadingHome} >
            {`Loading...`}
          </Text>
        </Animated.View>
      </View>
      <View style={styles.imgBorderHome} >
        <Image source={gif} style={styles.profilePicture} />
      </View>
    </View>
  )
}

export default LoadingHome