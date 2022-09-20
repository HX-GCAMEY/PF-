import React from "react";
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginBottom: 10,
        position: 'relative',
        backgroundColor: '#4EB6ED',
        alignSelf: 'center',
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
    rating: {
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        right: 50,
        top: 30,
    },
    comment: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        left: 25
    },
    text: {
        marginTop: 20,
        left: 25,
        marginBottom: 10
    }
})

const ReviewCard = ({text, rate}) => {
    
    return (
            <View style={styles.card} >
                <Text style={styles.comment} >Comment </Text>
                <Text style={styles.rating} >Rating: <Text>{rate}</Text></Text>
                <Text style={styles.text}>{text}</Text>
            </View>
    )
}

export default ReviewCard