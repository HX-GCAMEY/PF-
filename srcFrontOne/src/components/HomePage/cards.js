import React from "react";
import { View, Text,  Image,  Dimensions} from "react-native";
import styles from "./styles";
import avion from "./img/avion.jpg"


const Cards = ({item}) => {
    
    
        const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;


    const ANCHO_CONTENEDOR = width * 0.7;
    const ESPACIO = 10;


    return (
        <View style={styles.containerCards}>

            <View style={styles.imagenContainer}>
            <Image source={avion} style={{width: 300, height: ANCHO_CONTENEDOR * 0.8, resizeMode: 'cover', borderRadius: 24, margin: 10, marginBottom: 60, marginTop: 2, opacity: 0.8 }} />
            
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.arrival}> → {item.arrival.city}</Text>
            <Text style={styles.duration}>• Duration: {item.duration}</Text>
            <Text style={styles.price}>$ {item.defaultFare}</Text>
        </View>
        
            
            </View>
        
      
        </View>
    )
}



export default Cards;