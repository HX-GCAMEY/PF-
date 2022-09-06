import React from 'react';
import { NativeRouter } from 'react-router-native';
import { StyleSheet } from "react-native";
import Auth from './src/components/Main/Main';


export default function App() {
  return (
    <NativeRouter style={styles.container}>
      <Auth/>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
