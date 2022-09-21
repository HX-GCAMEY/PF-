import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   rootL:{
    backgroundColor: 'white',
    width: '70%',

    borderColor: '#ffa333',
    borderWidth: 1,
    borderRadius: 5,
    
    paddingHorizontal: 10,
    marginVertical: 8,
    shadowOpacity: 80,
    elevation: 15,
   },
   inputLogin: {
      marginLeft: 30,
      marginTop: -3,
      marginBottom: 2,
      paddingHorizontal: 6
   },
   iconInput: {
      marginBottom: -23,
      marginTop: 4,
      color: 'orange'
   },
   eyePassword: {
      marginLeft: 230,
      marginTop: -26,
      marginBottom: 5,
      color: 'grey'
   }
})


export default styles;