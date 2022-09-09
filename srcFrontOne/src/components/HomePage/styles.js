import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 0,
        marginBottom: 20,
        paddingHorizontal: 30,
        justifyContent: 'space-between'
    },
    categoryText: {
        fontSize: 16,
        color: '#1E1E1E',
        fontWeight: 'bold'
    },
    categoryTextSelected: {
        color: '#0183A0',
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: '#0183A0'
    },
    containerCards: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    arrival: {
        marginTop: -120,
        alignContent: 'center',
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 18

    },
    duration: {
        marginTop: 10,
        fontSize: 16,
        marginLeft: -100,
        fontWeight: 'bold',

    },
    price: {
        fontWeight: 'bold',
        marginTop: 50,
        fontSize: 22,
    }

})

export default styles;