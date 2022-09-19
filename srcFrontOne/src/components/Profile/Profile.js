import React, { useEffect, useState } from "react";
import { View, Image, Button, Text, TouchableOpacity, Modal, TextInput, ScrollView } from "react-native";
import styles from "./styles";
import avatar from "./imgs/avatar.png"
import * as ImagePicker from "expo-image-picker";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import welcome from "./imgs/welcome.png";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { userLogout, userDelete} from "../../Redux/Actions/users";
import Categories from "./categories/categories";


const Profile = ({navigation}) => {
    

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const user = useSelector((state) => state.userReducer.session);
    const categories = ["Profile", "My Tickets", "Reviews"];
    const [categoryIndex, setCategoryIndex] = useState(0);
    console.log('estamos aki', user)
    const dispatch  = useDispatch();
  
    
    const CategoryList = () => {
        return (
            <View style={styles.categoryContainer2}>
                {categories.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => setCategoryIndex(index)}>
                        <Text style={[styles.categoryText2, categoryIndex === index && styles.categoryTextSelected2]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }


  

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })()
    }, [])

    

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
        if(user.email){
            dispatch(userLogout(user.email))
        }
        navigation.navigate("Login")
        alert("Session closed successfully")
    }
    
    
    const changePassword = () => {
        navigation.navigate("ForgotPassword")
    }


    const onEdit = () => {
        navigation.navigate("EditProfile")
    }


    const onDelete = () => {
        if(user.email){
            dispatch(userDelete(user))
        }
        alert('Account deleted successfully')
    }

    const ProfileCategory = () => {
        return (
        <View>
        <View style={{alignItems: 'center'}}>
        <Image source={welcome} style={{marginTop: 40, marginLeft: 25, height: 30}}/>
        {user.email ? <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>{user.email}</Text> : <Text style={{color: '#131c46', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>user@email.com</Text>}
        
   </View>

         <View style={styles.textInfo}>
           <Feather name="user" size={25} style={styles.iconsP}/>
           {user.profile?.name ? <Text style={styles.textCat}>{user.profile.name}</Text> : <Text style={styles.textCat}>Full Name</Text>}
         </View>

         <View style={styles.textInfo}>
           <FontAwesome5 name="passport" size={25} style={styles.iconsP}/>
           {user.profile?.passport ? <Text style={styles.textCat}>{user.profile.passport}</Text> : <Text style={styles.textCat}>Passport</Text>}
         </View>
         
         <View  style={styles.textInfo}>
           <FontAwesome5 name="map-marker-alt" size={25}style={styles.iconsP} />
           {user.profile?.nationality ? <Text style={styles.textCat}>{user.profile.nationality}</Text> : <Text style={styles.textCat}>Nationality</Text>}
         </View>

         <View  style={styles.textInfo}>
           <FontAwesome5 name="phone-square-alt" size={25} style={styles.iconsP}/>
           {user.profile?.phone ? <Text style={styles.textCat}>{user.profile.phone}</Text> : <Text style={styles.textCat}>Phone number</Text>}
         </View>

   <View>
         <TouchableOpacity style={styles.editBtn} onPress={() => onEdit()}>
           <Text style={styles.editProfile}>Edit profile</Text>
         </TouchableOpacity>
       <MaterialCommunityIcons 
           name="logout" 
           size={40} 
           style={{marginLeft: 180, marginTop: 30}}
           onPress={() => onLogout()}
           />
   </View>
   <View style={styles.changeBtn}>
   <MaterialCommunityIcons name="onepassword" size={25} style={{marginRight: 15}}/>
   <Text style={{fontSize: 16, marginLeft: -5, color: 'black'}} onPress={() => changePassword()}>Change password</Text>
   </View>
   <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete()}>
       <Text style={{color: 'red', fontSize: 15, fontWeight: 'bold'}}>Delete account</Text>
   </TouchableOpacity>
   </View>
        )
    }


    return (
        <ScrollView>
        <LinearGradient colors={['#009DCF', '#07C5C5']} style={{height: '100%'}}>
        <View style={styles.containerProfile} onPress={() => pickImage()}>
            {image? 
                <View style={styles.containerImage}>
                <Image source={{uri: image}} style={styles.imgUser} /> 
                </View>
            
            : <View style={styles.containerImage}>
                <Image source={avatar} style={[styles.avatarImg, {width:100, height:100}]} />
              </View>
              }
        <View style={styles.containerAdd}>
            <AntDesign name="addfolder" size={20} style={{paddingLeft: 4}} onPress={() => pickImage()}/>  

        </View>
        <View>
        </View>
            <CategoryList />
            <View style={{height: '100%'}} >
            {!user ? <Text>Loading...</Text> : categoryIndex === 0 ? <ProfileCategory/> : categoryIndex === 1 ? <Text>flights</Text> : categoryIndex === 2 ? <Text>reviews</Text> : null}
              </View>
        </View>
        </LinearGradient>
        </ScrollView>
    )
}

export default Profile;