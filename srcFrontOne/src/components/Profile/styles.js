import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#4EB6ED',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 30
    },
    avatarImg: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 145,
        marginTop: 85,
        backgroundColor: '#07C5C5',
        borderRadius: 50
    },
    containerImage: {
        backgroundColor: '#00001a',
        height: 160
    },
    imgUser: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        marginLeft: 150,
        marginTop: 80,
        borderRadius: 50
    },
    textInfo: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#40E0D0',
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 12,
        elevation: 5,
        marginTop: 20,
    },
    editProfile: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    iconsP: {
        marginRight: 15
    },
    btnAdd: {
        color: 'white'
    },
    containerAdd: {
        width: 30,
        marginLeft: 220,
        marginTop: -10,
    
    },
    categoryContainer2:{
        left: 2,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 40,
        paddingHorizontal: 0,
    },
    categoryText2: {
        bottom: -5,
        right: 10,
        padding: 10,
        marginLeft: 20,
        fontSize: 18,
        color: '#1E1E1E',
        fontWeight: 'bold',
    },
    categoryTextSelected2: {
        color: 'black',
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: 'orange',

    },
    textCat:{
        fontSize: 18,
        fontWeight: 'bold',
        
    },
    changeBtn: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#40E0D0',
        width: '80%',
        padding: 8,
        paddingBottom: 10,
        borderRadius: 5,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
        marginBottom: 50
    },
    deleteBtn: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#40E0D0',
        width: '80%',
        padding: 10,
        paddingBottom: 10,
        borderRadius: 5,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: -5,
        marginBottom: 50
    },
    editBtn: {
        backgroundColor: '#ffa333', 
        padding: 10, 
        marginTop: 20, 
        marginLeft: 140, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginRight: 140
    },
    ticketContainer: {
        paddingTop: 20,
        minHeight: 500
    },
    ticketCard: {
        backgroundColor: '#f2f2f2',
        width: '90%',
        marginBottom: 15,
        alignSelf: 'center',
        minHeight: 160,
        borderRadius: 12,
        position: 'relative'
    },
    ticketBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 12,
        left: 0,
        right: 0,
        zIndex: 0
    },
    ticketNumber: {
        position: 'absolute',
        zIndex: 10,
        fontSize: 18,
        top: 2,
        alignSelf: 'center',
        fontStyle: 'italic'
    },
    ticketType: {
        position: 'absolute',
        zIndex: 10,
        left: 240,
        top: '30%',
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    ticketFare: {
        position: 'absolute',
        zIndex: 10,
        left: 240,
        top: '60%',
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    ticketDepartDate: {
        position: 'absolute',
        top: '30%',
        left: 12,
        fontSize: 14,
        fontWeight: 'bold'
    },
    ticketArrivalDate: {
        position: 'absolute',
        top: '60%',
        left: 12,
        fontSize: 14,
        fontWeight: 'bold'
    },
    ticketState: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 5,
        fontSize: 18
    },
    stateFinished: {
        color: 'green'
    },
    stateAwaiting: {
        color: 'red'
    },
    ticketButton: {
        fontSize: 15,
        paddingVertical: 2,
        paddingHorizontal: 10,
        fontWeight: 'bold'
    },
    ButtonTick: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 12,
        backgroundColor: '#f0a10cde',
    }
})

export default styles;