import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import backImage from '../../HomePage/img/backCard.jpg';
import styles from '../styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";

const TicketCard = ({item}) => {

    let currentDate = new Date();
    currentDate = currentDate.toISOString().slice(0, 10).replace('-','').replace('-','');
    let arrDate = item.arrivalDate.replace('-','').replace('-','');
    const navigation = useNavigation();

    const addReview = () => {
        navigation.navigate('ReviewForm', item.flight_id);
    }

    return (
      <View style={styles.ticketCard}>
            <Image style={styles.ticketBackground} source={backImage} />
            <Text style={styles.ticketNumber}>Ticket  Nº {item._id}</Text>
            <Text style={styles.ticketDepartDate}><FontAwesome5 name='plane-departure' size={16}/>  {item.departDate}</Text>
            <Text style={styles.ticketArrivalDate}><FontAwesome5 name='plane-arrival' size={16}/>  {item.arrivalDate}</Text>
            <Text style={styles.ticketType}>Type: {item.type}</Text>
            <Text style={styles.ticketFare}>Fare: {item.fare}</Text>
            <Text style={styles.ticketState}>{currentDate >= arrDate ? <Text style={styles.stateFinished}>ARRIVED</Text> : <Text style={styles.stateAwaiting}>PENDING</Text>}</Text>
            {currentDate >= arrDate ? <Pressable onPress={() => addReview()} style={styles.ButtonTick}><Text style={styles.ticketButton}>Add Review</Text></Pressable> : null}
      </View>
    )
}

export default TicketCard;