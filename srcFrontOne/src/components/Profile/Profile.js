import React, { useEffect, useState } from "react";
import { View, Image, Button, Text, TouchableOpacity, Modal, TextInput, ScrollView } from "react-native";
import styles from "./styles";
import avatar from "./avatar.jpg"
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const DATA = [
    {id: 1, text: 'Username'},
    {id: 2, text: 'Birthday'},
    {id: 3, text: 'Passport'},
    {id: 4, text: 'Nationality'},
    {id: 5, text: 'Phone'},

]

const Profile = ({navigation}) => {
    
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [data, setData] = useState(DATA)
    const [isRender, setIsRender] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputText, setInputText] = useState();
    const [editItem, setEditItem] = useState();


    const onPressItem = (item) => {
        setIsModalVisible(true);
        setInputText(item.text);
        setEditItem(item.id)
    }

    const renderItem = ({item, index}) => {
        return(
            <TouchableOpacity onPress={() => onPressItem(item)} style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#B5E4F0',
                width: '100%',
                padding: 20,
                paddingBottom: 22,
                borderRadius: 10,
                shadowOpacity: 80,
                elevation: 15,
                marginTop: 20,
            }}>
                <Ionicons name="airplane-outline" size={25} style={{marginRight: 15}}/>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>{item.text}</Text>
            </TouchableOpacity>
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
        console.log(res)


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
        navigation.replace("Login")
        alert("Session closed successfully")
    } 
    const changePassword = () => {
        navigation.navigate("ForgotPassword")
    }


    const handleEditItem = () => {
        const newData = data.map(item => {
            if(item.id === editItem){
                item.text = inputText
                return item;
            }
            return item;
        })
        setData(newData)
        setIsRender(!isRender)
    }
    const onPressSave = () => {
        handleEditItem(editItem)
        setIsModalVisible(false)
    }

    return (
        <ScrollView>
        <View style={styles.containerProfile}>
            {image? 
                <View style={styles.containerImage}>
                <Image source={{uri: image}} style={styles.imgUser} /> 
                </View>
            
            : <View style={styles.containerImage}>
                <Image source={avatar} style={[styles.avatarImg, {width:100, height:100}]} />
              </View>
              }

            <Button 
                title="Add image" 
                onPress={() => pickImage()} 
                color="#04A7B6"
                />
        <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#04A7B6', marginLeft:10}}>Welcome to your profile:</Text>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'grey'}}>user@gmail.com</Text>
        </View>
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                extraData={isRender}
            />
            <Modal
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
    
            >
            
                <View style={{alignItems: 'center', marginTop: 80}}>
                <Text style={{color: 'black', fontSize:20, fontWeight: 'bold'}}>Enter new information:</Text>
                <TextInput
                    style={styles.inputModal}
                    textAlign='center'
                    onChangeText={(text) => setInputText(text)}
                    defaultValue={inputText}
                    editable={true}
                    multiline={false}
                    maxLength={200}
                    />

                <TouchableOpacity onPress={() => onPressSave()} style={{backgroundColor: '#004173', width: 100, marginTop: 20, alignSelf: 'center', borderRadius: 15, height: 60}}>
                    <Text style={{color: 'white', fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>SAVE</Text>
                </TouchableOpacity>
            </View>
                </Modal>
        </View>
        <View>
            <MaterialCommunityIcons 
                name="logout" 
                size={40} 
                style={{marginLeft: 190, marginTop: 25, shadowOpacity: 80, elevation: 10}}
                onPress={() => onLogout()}
                />
        </View>
        <View style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#fff',
            width: '100%',
            padding: 20,
            paddingBottom: 22,
            borderRadius: 10,
            shadowOpacity: 80,
            elevation: 15,
            marginTop: 20,
            }}>
        <MaterialCommunityIcons name="onepassword" size={25} style={{marginRight: 10}}/>
        <Text style={{fontSize: 16, marginLeft: 5, color: '#04A7B6'}} onPress={() => changePassword()}>Change password</Text>
        </View>
        </View>
        </ScrollView>
    )
}

export default Profile;