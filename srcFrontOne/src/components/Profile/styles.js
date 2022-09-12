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
        marginLeft: 156,
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
        marginLeft: 156,
        marginTop: 80,
        borderRadius: 45
    },
    inputModal: {
        backgroundColor: '#ffd19b', 
        width: '100%',
        marginTop: 20,
        height: 50,
        borderColor: 'black',
        borderWidth: 0.5,
        fontWeight: 'bold',
        
    },

})

export default styles;