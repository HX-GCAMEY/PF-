import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
        padding: 5,
    },
    container_PRIMARY:{
        backgroundColor: '#A0C8C3',
        marginTop: 10,
        borderRadius: 25,
        width: '30%',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        borderLeftColor: 'black',
        borderLeftWidth: 2
    },

    container_TERTIARY: {},

    container_FACEBOOK: {
        backgroundColor: '#E7E4F4',
        color: '#4765A9',
        marginTop: 10,
    },
    container_FOURTH:{
        backgroundColor: 'transparent',
        width: '30%',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10
    },
    container_GOOGLE: {
        backgroundColor: '#FAE9E4',
        color: '#DD4D44',   
        marginTop: 10,
        width: '40%'
    },
    container_SECONDARY:{
        borderColor: '#04AFB8',
        padding: 10,
        borderWidth: 2,
        borderRadius: 20,
    },
    text: {
        fontWeight: 'bold',
        color: '#131c46',
    },
    text_SECONDARY: {
        color: '#04AFB8'
    },
    text_TERTIARY:{
        color: '#131c46'
    },
    text_PRIMARY: {
        marginTop: -1,
    },
    text_FOURTH: {
        color: 'white'
    }
})


export default styles;