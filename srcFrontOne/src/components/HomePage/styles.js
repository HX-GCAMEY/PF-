import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    fadingContainer: {
        padding: 20,
        backgroundColor: 'transparent'
    },
    imgBorder: {
        width: 150,
        height: 150,
        borderRadius: 300,
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1%',
    },
    textLoadingHome: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 19,
        top: 0,
        backgroundColor: 'transparent'
    },

    logoMini: {
        marginBottom: 50,
        top: 38,
        left: 20

    },
    profilePicture: {
        width: 400,
        height: 300,
    },
    viewContainerFlat: {
        // backgroundColor: '#0184A0',
        paddingHorizontal: 0,
        paddingVertical: 0,
        left: 0,
        right: 0,
        marginLeft: 4,
        paddingBottom: 10,
        paddingTop: 10
    },
    cardContainerr: {
        width: 360,
        resizeMode: 'cover',
        borderRadius: 25,
        margin: 10,
        marginBottom: 53,
        marginTop: 2,
        opacity: 1,
        // left: 0,
        // right: 10,
    },
    imageCardNews: {
        width: 360,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 10,
        marginBottom: 60,
        marginTop: 2,
        opacity: 1
    },
    categoryContainer: {
        // backgroundColor: 'red',
        right: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: -10,
        marginBottom: 6,
        paddingHorizontal: 0,
        // justifyContent: 'space-between',

    },
    categoryContainerText: {
        left: 50,
        flexDirection: 'row',
        marginTop: 0,
        marginBottom: 20,
        paddingHorizontal: 0,
        // justifyContent: 'space-between',

    },
    categoryText: {
        right: 10,
        padding: 10,
        marginLeft: 20,
        // marginLeft: 70,
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
        marginLeft: 9,
        marginRight: 9,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    cardViewStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagenContainer: {
        backgroundColor: 'transparent'
    },
    arrival: {
        color: '#252440',
        bottom: 174,
        position: 'absolute',
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    departCityCard: {
        color: '#252440',
        padding: 10,
        bottom: 60,
        fontWeight: 'bold',
        fontSize: 18,
    },
    duration: {
        color: '#0183a0db',
        bottom: 33,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'bold',
    },

    dateCard: {
        color: '#d3a247db',
        bottom: 130,
        left: 20,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeCard: {
        color: '#d3a247db',
        bottom: 110,
        left: 45,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateCardArrival: {
        color: '#d3a247db',
        bottom: 130,
        // left: 50,
        position: 'absolute',
        right: 20,
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeCardArrival: {
        color: '#d3a247db',
        bottom: 110,
        right: 45,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textDep: {
        color: '#252440',
        bottom: 148,
        left: 27,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'italic',
    },
    textArr: {
        color: '#252440',
        bottom: 148,
        right: 40,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'italic',
    },

    price: {
        borderTopColor: 'red',
        borderTopWidth: 1.6,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopColor: '#d3a247db',
        color: '#252440',
        bottom: 64,
        // right: 50,
        position: 'absolute',
        fontWeight: 'bold',
        fontSize: 21,
    }
})

export default styles;