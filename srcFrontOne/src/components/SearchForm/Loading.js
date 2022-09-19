import React, { useEffect, useRef } from 'react'
import { Text, View, Image, Animated, SafeAreaView, Button } from 'react-native'
import logo from './img/logos.png'
import gif from './img/loadingGif.gif'
import loadingLogo from './img/loading.png'
import styles from './styles'

const Loading = ({ onCloseModal }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      delay: 0,
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }
  fadeIn()


  return (
    <SafeAreaView >
      <View>
        <Animated.View
          style={[
            styles.fadingContainer,
            { opacity: fadeAnim }]}>
          <Image source={loadingLogo} style={styles.loadingLogo} />
        </Animated.View>
      </View>
      <View style={styles.imgBorder} >
        <Image source={gif} style={styles.profilePicture} />
      </View>
      <Image source={logo} style={{ alignSelf: 'center', top: 80 }} />
    </SafeAreaView>
  )
}

export default Loading