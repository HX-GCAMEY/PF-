import React from 'react';
import { NativeRouter } from 'react-router-native';
import { StyleSheet } from "react-native";
import Main from './src/components/Main/Main';


export default function App() {
  return (
    <NativeRouter style={styles.container}>
      <Main/>
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
