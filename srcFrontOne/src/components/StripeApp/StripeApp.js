import { CardField } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './styles';

const StripeApp = () => {

    //const email = useSelector((state) => state.userReducer.session)
    const [cardDetails, setCardDetails] = useState('');

    const navigation = useNavigation();

    const handlePayPress = async () => {
        //if(!email) {
        //Alert.alert("Please log in to continue")
        //return;
        //}
        if (!cardDetails?.complete) {
            Alert.alert("Please enter complete card details")
            return;
        }
        Alert.alert(
            "You are about to make the purchase",
            "Are you sure?",
            [
                {
                    text: "Cancel"
                },
                {
                    text: "Yes",
                    onPress: () => navigation.navigate('Success')
                }
            ]
        )
    }

    return (
        <View style={{ top: 350 }}>
            <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: "4242 4242 4242 4242",
                }}
                cardStyle={styles.card}
                style={styles.cardContainer}
                onCardChange={(cardDetails) => {
                    setCardDetails(cardDetails);
                }}
            />
            <Pressable onPress={() => handlePayPress()}>
                <LinearGradient colors={['#06C5C5', '#06C5C5']} style={{ width: 304, height: 42, borderRadius: 20, marginLeft: 60, marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#FFFFFF95", textAlign: "center", top: 8 }}>Confirm</Text>
                </LinearGradient>
            </Pressable>
        </View>
    )
}

export default StripeApp;
