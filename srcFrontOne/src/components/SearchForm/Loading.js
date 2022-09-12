import React, { useEffect, useRef } from 'react'
import { Text, View, Image, Animated, SafeAreaView, Button } from 'react-native'
import logo from './img/logos.png'
import gif from './img/loadingGif.gif'
import styles from './styles'

const Loading = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      delay: 2000,
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start();
  };
  fadeIn()

  return (
    <SafeAreaView >
      <View>
        <Animated.View
          style={[
            styles.fadingContainer,
            { opacity: fadeAnim }]}>
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 19, top: 20, backgroundColor: 'transparent' }} >
            {`There are no matching flights for this date`}
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

export default Loading