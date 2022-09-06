import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  MainContainer: {
    borderRadius: 10,
    flex: 0,
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 10,
    maxHeight: 100,

  },

  text: {
    borderRadius: 10,
    fontSize: 18,
    fontStyle: 'bold',
    color: '#7f12e5',
    marginBottom: 67,
    textAlign: 'center',
    backgroundColor: '#fc766aa0'
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    width: 320,
    height: 0,
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    width: 100,
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
    color: '#ffff',
    backgroundColor: '#252440'
  }


});

export default styles