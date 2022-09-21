import { CardField } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Pressable, Dimensions, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './styles';
import card from './img/Card.png';
import visa from './img/Visa.png';

const StripeApp = () => {

    const [cardNumber, setCardNumber] = useState(null);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("")
    const [cvc, setCvc] = useState(null);
    const [name, setName] = useState('');

    const navigation = useNavigation();

    const handlePayPress = async () => {
        if(!cardNumber && !month && !year && !cvc && !name) {
            Alert.alert("Please enter complete card details")
            return;
        }
        if(!cardNumber) {
            Alert.alert("Please complete the card number")
            return;
        }
        if(!month || !year) {
            Alert.alert("Please complete the expiry date")
            return;
        }
        if(!cvc) {
            Alert.alert("Please complete the CVC")
            return;
        }
        if(!name) {
            Alert.alert("Please complete the full name")
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

    const widthMax = Dimensions.get("window").width;
    const heightMax = Dimensions.get("window").height;

    return(
        <LinearGradient colors={["#06C5C5", "#14366F"]} style={{width: widthMax, height: heightMax * 1.2}}>
            <View>
                <Image source={card} style={styles.cardContainer}/>
                <Image source={visa} style={styles.visa}/>
                <Text style={styles.cardNumber}>{cardNumber}</Text>
                <Text style={styles.expires}>Expires</Text>
                <Text style={styles.month}>{month}/{year}</Text>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={{top: 330}}>
                <View style={{top: 37, left: 35}}>
                    <Text style={{fontSize: 16, color: "#FFFFFF", letterSpacing: 2}}>CARD NUMBER</Text>
                    <TextInput
                    style={{paddingLeft: 10, backgroundColor: "#4B98AC", height: 32, width: 320, borderRadius: 10, marginTop: 10, marginBottom: 10, shadowColor: "#000", shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3,  color: "#FFFFFF"}}
                    value={cardNumber}
                    onChangeText={(cardNumber) => setCardNumber(cardNumber)}
                    placeholder="e.g. 1234 5678 9123 4567"
                    placeholderTextColor={'#A5C6D3'}
                    keyboardType="number-pad"
                    maxLength={19}
                    textContentType="creditCardNumber"
                    />
                </View>
                <View style={{top: 47, left: 35}}>
                    <Text style={{fontSize: 16, color: "#FFFFFF", letterSpacing: 2}}>EXPIRY DATE</Text>
                    <TextInput
                    style={{paddingLeft: 10, backgroundColor: "#4B95AB", height: 32, width: 70, borderRadius: 10, marginTop: 10, marginBottom: 10, shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, color: "#FFFFFF"}}
                    value={month}
                    onChangeText={(date) => setMonth(date)}
                    placeholder="MM"
                    placeholderTextColor={'#A5C6D3'}
                    keyboardType="number-pad"
                    maxLength={2}
                    />
                    <TextInput
                    style={{paddingLeft: 10, backgroundColor: "#4B95AB", height: 32, width: 70, borderRadius: 10, marginTop: -42, marginLeft: 80, marginBottom: 10, shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, color: "#FFFFFF"}}
                    value={year}
                    onChangeText={(date) => setYear(date)}
                    placeholder="YY"
                    placeholderTextColor={'#A5C6D3'}
                    keyboardType="number-pad"
                    maxLength={2}
                    />
                </View>
                <View style={{left: 255, top: -27}}>
                    <Text style={{fontSize: 16, color: "#FFFFFF", letterSpacing: 2}}>CVC</Text>
                    <TextInput
                    style={{paddingLeft: 10, backgroundColor: "#4C8FA7", height: 32, width: 100, borderRadius: 10, marginTop: 10, marginBottom: 10, shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, color: "#FFFFFF"}}
                    value={cvc}
                    onChangeText={(cvc) => setCvc(cvc)}
                    placeholder="e.g. 123"
                    placeholderTextColor={'#A5C6D3'}
                    keyboardType="number-pad"
                    maxLength={3}
                    />
                </View>
                <View style={{left: 35, top: -15}}>
                    <Text style={{fontSize: 16, color: "#FFFFFF", letterSpacing: 2}}>FULL NAME</Text>
                    <TextInput
                    style={{paddingLeft: 10, backgroundColor: "#4D84A0", height: 32, width: 320, borderRadius: 10, marginTop: 10, marginBottom: 10, shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, color: "#FFFFFF"}}
                    value={name}
                    onChangeText={(name) => setName(name)}
                    placeholder="e.g. Albus Dumbledore"
                    placeholderTextColor={'#A5C6D3'}
                    textContentType="name"
                    />
                </View>
                <Pressable onPress={() => handlePayPress()}>
                    <LinearGradient colors={['#4E7698', '#4E7698']} style={{width: 304, height: 42, borderRadius: 20, marginLeft: 40, marginTop: 30}}>
                        <Text style={{fontSize: 16, fontWeight: "bold", color:"#FFFFFF95", textAlign: "center", top: 10}}>Confirm</Text>
                    </LinearGradient>
                </Pressable>
            </View> 
        </LinearGradient>
    )
}

export default StripeApp;
