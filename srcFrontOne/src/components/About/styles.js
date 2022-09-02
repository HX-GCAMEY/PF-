import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.7,
        justifyContent: 'center',
        marginBottom: 200,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#fff',
        marginTop: -150,
        paddingBottom: 40,
        textAlign: 'center'
    },
    description: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 18,
        color: '#fff',
        marginLeft: -15,
        paddingHorizontal: 10,
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#493d8a',
        marginHorizontal: 8
    },
})

export default styles;