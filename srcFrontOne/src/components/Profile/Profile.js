import React, { useEffect, useState } from "react";
import { View, Image, Button, Text, TouchableOpacity, Modal, TextInput, ScrollView } from "react-native";
import styles from "./styles";
import avatar from "./avatar.jpg"
import * as ImagePicker from "expo-image-picker";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import welcome from "./imgs/welcome.png";


const Profile = ({navigation}) => {
    
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const user = useSelector((state) => state.userReducer.session);
    console.log('estamos aki', user)

    
    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })()
    }, [])

    // async function fetchUser(){
    //     let info = dispatch(getUser(user.email))
    //    setLogged(info)
    

    const pickImage = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if(!res.cancelled){
            setImage(res.uri)
        }
    }
    if(hasGalleryPermission === false){
        return(
            <Text>No access to Internal Storage</Text>
        )
    }

 
    const onLogout = () => {
        navigation.navigate("Login")
        alert("Session closed successfully")
    } 
    const changePassword = () => {
        navigation.navigate("ForgotPassword")
    }
    const onEdit = () => {
        navigation.navigate("EditProfile")
    }

    return (
        <ScrollView>
        <LinearGradient colors={['#009DCF', '#07C5C5']}>
        <View style={styles.containerProfile} onPress={() => pickImage()}>
            {image? 
                <View style={styles.containerImage}>
                <Image source={{uri: image}} style={styles.imgUser} /> 
                </View>
            
            : <View style={styles.containerImage}>
                <Image source={avatar} style={[styles.avatarImg, {width:100, height:100}]} />
              </View>
              }

        <View style={{alignItems: 'center'}}>
             <Image source={welcome} style={{marginTop: 20, marginLeft: 25, height: 30}}/>
             {user.email ? <Text>{user.email}</Text> : <Text style={{color: '#131c46', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>user@email.com</Text>}
             
        </View>
              <View style={styles.textInfo}>
                <Feather name="user" size={25} />
                {user.name ? <Text>{user.profile.name}</Text> : <Text>Full Name</Text>}
              </View>

              <View style={styles.textInfo}>
                {user.passport ? <Text>{user.profile.passport}</Text> : <Text>Passport</Text>}
              </View>
              
              <View  style={styles.textInfo}>
                {user.nationality ? <Text>{user.profile.nationality}</Text> : <Text>Nationality</Text>}
              </View>

              <View  style={styles.textInfo}>
                {user.phone ? <Text>{user.profile.phone}</Text> : <Text>Phone number</Text>}
              </View>

        <View>
              <TouchableOpacity style={{backgroundColor: '#131c46', padding: 10, marginTop: 20, marginLeft: 40, borderRadius: 30, alignItems: 'center', marginRight: 40}}>
                <Text style={styles.editProfile} onPress={() => onEdit()}>Edit profile</Text>
              </TouchableOpacity>
            <MaterialCommunityIcons 
                name="logout" 
                size={40} 
                style={{marginLeft: 180, marginTop: 30}}
                onPress={() => onLogout()}
                />
        </View>
        <View style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#7BB4E3',
            width: '80%',
            padding: 8,
            paddingBottom: 10,
            borderRadius: 5,
            shadowOpacity: 80,
            elevation: 15,
            marginTop: 20,
            marginBottom: 50
            }}>
        <MaterialCommunityIcons name="onepassword" size={25} style={{marginRight: 15}}/>
        <Text style={{fontSize: 16, marginLeft: -5, color: 'black'}} onPress={() => changePassword()}>Change password</Text>
        </View>
        </View>
        </LinearGradient>
        </ScrollView>
    )
}

export default Profile;