import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 70
  },
  input: {
    height: 40,
    width: 200,
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 1,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 4,
    margin: 5,
  },
  textInputs: {
    alignSelf: 'center'
  },
  rendInput: {
    borderWidth: 1,
    marginTop: 5,
    width: 350,
    alignSelf: 'center',
    borderRadius: 4
  },
  image: {
    maxHeight: 150,
    maxWidth: 150,
    marginTop: 100,
    marginBottom: -500
  },
  imageContainter: {
    alignItems: 'center'
  }
})

export default styles;