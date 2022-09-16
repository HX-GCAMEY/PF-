import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
        inputs: {
            marginTop: 30,
            backgroundColor: 'white',
            width: '80%',
            borderRadius: 10,
            borderColor: '#131c46',
            borderWidth: 1.2,
            height: 40,
            shadowColor: 'black',
            shadowOpacity: 80,
            shadowRadius: 40,
            elevation: 40,
            paddingHorizontal: 15,
        },
        textInput: {
            fontWeight: 'bold',
            marginBottom: -20,
            marginTop: 20,
            fontSize: 16,
            color: '#131c46',
         
        },
        btnSubmit: {
            fontWeight: 'bold',
            color: 'black'
        }, 
        btnS: {
            backgroundColor: '#f0a10cde', 
            padding: 10, 
            marginTop: 30, 
            borderRadius: 10, 
            shadowOpacity: 80, 
            elevation: 20, 
            borderBottomColor: 'black', 
            borderBottomWidth: 2, 
            borderLeftColor: 'black', 
            borderLeftWidth: 2
        }
  })

  export default styles;