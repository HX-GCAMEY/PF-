import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 5,
        padding: 5,
    },
    container_PRIMARY:{
        backgroundColor: '#06C5C5',
        borderRadius: 25,
        width: '30%'
    },

    container_TERTIARY: {},

    container_FACEBOOK: {
        backgroundColor: '#E7E4F4',
        color: '#4765A9',
        marginTop: 10,
    },
    container_GOOGLE: {
        backgroundColor: '#FAE9E4',
        color: '#DD4D44',   
        marginTop: 10
    },
    container_SECONDARY:{
        borderColor: '#04AFB8',
        padding: 10,
        borderWidth: 2,
        borderRadius: 20,
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
    text_SECONDARY: {
        color: '#04AFB8'
    },
    text_TERTIARY:{
        color: 'grey'
    },
    text_PRIMARY: {
        marginTop: -1,
    }
})


export default styles;