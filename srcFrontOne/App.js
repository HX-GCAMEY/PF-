import React from 'react';
import { NativeRouter } from 'react-router-native';
import { StyleSheet } from "react-native";
import Auth from './src/components/Main/Main';

import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

//clave: 803324446340-rru9e293vrsl0vku9te6lfcqp67j261d.apps.googleusercontent.com
//clave android: 803324446340-826d6c268hqd7i2jgtpcgf0jljol59pd.apps.googleusercontent.com
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
