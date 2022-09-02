import React from "react";
import { useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getFlights } from "../../Redux/Actions/flights";
import FlightCard from "../FlightCard/FlightCard";

const Flights = () => {

    let dispatch  = useDispatch();
    let allFlights = useSelector((state) => state.flights);
    console.log(allFlights)

    useEffect(() => {
        dispatch(getFlights())
    }, [dispatch]);
    

    return (
        <View style={styles.container}>
            <Text>FLIGTHS PAGE</Text>
            <FlightCard departure={'EZE'} departureTime={'1.30'} destination={'MIA'} destinationTime={'18.00'} fare={'100.000'}/>
            {/*
            EL MAP NO FUNCIONA --> FLAT LIST
            { allFlights && allFlights.map(f => 
                <FlightCard 
                key={f.id} 
                departure={f.departureCity} 
                departureTime={f.departureTime} 
                destination={f.arrivalCity}
                destinationTime={f.arrivalTime}
                fare={f.defaultFare}
                />
            )}*/}
        </View>
    )
}

export default Flights;