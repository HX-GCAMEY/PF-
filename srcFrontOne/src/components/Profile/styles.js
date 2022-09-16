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
        marginLeft: 150,
        marginTop: 80,
        borderRadius: 45,
    },
    containerImage: {
        backgroundColor: '#0E2F49',
        height: 200
    },
    imgUser: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        marginLeft: 150,
        marginTop: 80,
        borderRadius: 45
    },
    textInfo: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#7BB4E3',
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
    }

})

export default styles;