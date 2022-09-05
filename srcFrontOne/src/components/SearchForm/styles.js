import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 70,
  },
  input: {
    height: 40,
    width: 200,
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 1,
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: 4,
    margin: 5,
    marginTop: 100
  },
  textInputs: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  rendInput: {
    borderWidth: 0,
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
  },
  container: {
    borderRadius: 15,
    marginHorizontal: 8,
    margin: 8,
    marginLeft: -10,
    //height: 78,
    height: 100,
    width: 370,
  },
  date:{
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    left: 20,
  },
  departureCard:{
    fontSize: 15,
    fontWeight: "bold",
    position: "absolute",
    top: 32,
    left: 20,
  },
  arrivalCard: {
    fontSize: 15,
    fontWeight: "bold",
    position: "absolute",
    top: 52,
    left: 20,
  },
  price: {
    position: "absolute",
    fontSize: 16,
    top: 75,
    left: 130,
    fontWeight: 'bold'
  },
  select: {
    color: 'orange'
  }
})

export default styles;