import React, { useEffect, useRef } from 'react'
import { Text, View, Image, Animated, SafeAreaView, Button } from 'react-native'
import logo from './img/logos.png'
import gif from './img/loadingGif.gif'
import styles from './styles'

const NoMatch = ({ onCloseModal }) => {
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
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 19, top: 40, backgroundColor: 'transparent' }} >
            {`The are no flights available`}
          </Text>
        </Animated.View>
      </View>
      <View style={styles.imgBorder} >
        <Image source={gif} style={styles.profilePicture} />
      </View>
      <Image source={logo} style={{ alignSelf: 'center', top: 50 }} />
    </SafeAreaView>
  )
}

export default NoMatch