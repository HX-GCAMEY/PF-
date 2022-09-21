import React from "react";
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginBottom: 10,
        position: 'relative',
        backgroundColor: '#40E0D0',
        alignSelf: 'center',
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 12,
        shadowOpacity: 80,
        elevation: 5,
        marginTop: 20
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
    let starx = [];
    const stars = () => {
        for (let i=0;i<rate;i++) {
            starx.push('⭐');
        }
        return <Text>{starx}</Text>
    }

    return (
            <View style={styles.card} >
                <Text style={styles.comment} >Comment </Text>
                <Text style={styles.rating} >{stars()}</Text>
                <Text style={styles.text}>{text}</Text>
            </View>
    )
}

export default ReviewCard