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
        borderRadius: 5,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        borderLeftColor: 'black',
        borderLeftWidth: 2
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
    }

})

export default styles;