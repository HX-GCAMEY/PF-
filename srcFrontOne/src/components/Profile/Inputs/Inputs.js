import React, {useState} from "react";
import { View, Text, Button, Image,  TextInput, TouchableOpacity } from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { updateUser } from "../../../Redux/Actions/users";
import {LinearGradient} from "expo-linear-gradient";
import styles from "./styles";
import logoProfile from "../imgs/logoProfile.png";

const Inputs = ({navigation}) => {
    const [name, setName] = useState('');
    const [passport, setPassport] = useState('');
    const [nationality, setNationality] = useState('');
    const [phone, setPhone] = useState('');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.session)
    console.log("aca toy en input", user)


    const handleSubmit = (name, passport, nationality, phone) => {
        dispatch(updateUser(user.email, {name, passport, nationality, phone}))
        navigation.navigate("Profile")
        setName('');
        setPassport('');
        setNationality('');
        setPhone('');
        
    }


    return(
    <LinearGradient colors={['#07C5C5', '#0184A0']} style={{height: '100%'}}>
        <View style={{alignItems: 'center', marginTop: 120, paddingHorizontal: 10}}>
            <Image source={logoProfile} />

            
            <Text style={styles.textInput}>{'Name:'}</Text>
            <TextInput 
            style={styles.inputs}
            value={name}
            onChangeText={(name) => setName(name)}
            placeholder="Insert name..."
            />
    
            <Text style={styles.textInput}>{'Passport:'}</Text>
            <TextInput
            style={styles.inputs}             
            value={passport}
            onChangeText={(passport) => setPassport(passport)}
            placeholder="Insert passport..."
            />
    
            <Text style={styles.textInput}>{'Nationality:'}</Text>
            <TextInput 
            style={styles.inputs}
            value={nationality}
            onChangeText={(nationality) => setNationality(nationality)}
            placeholder="Insert nationality..."
            />
    
            <Text style={styles.textInput}>{'Phone:'}</Text>
            <TextInput 
            style={styles.inputs}           
            value={phone}
            onChangeText={(phone) => setPhone(phone)}
            placeholder="Insert phone number..."
            />

            <TouchableOpacity  onPress={() => handleSubmit(name, passport, nationality, phone)} style={styles.btnS}>
                <Text style={styles.btnSubmit}>SUBMIT</Text>
            </TouchableOpacity>
              
            

    </View>
    </LinearGradient>

    )
}


export default Inputs;