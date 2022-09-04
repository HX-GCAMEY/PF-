import React from "react";
import { useEffect } from "react";
import { Image, ScrollView, Text } from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getFlights } from "../../Redux/Actions/flights";
import SearchForm from "../SearchForm/SearchForm";
import FlightCard from "../FlightCard/FlightCard";


const Flights = () => {

    /*let dispatch  = useDispatch();
    let allFlights = useSelector((state) => state.flights);
    console.log(allFlights)

    useEffect(() => {
        dispatch(getFlights())
    }, [dispatch]);*/
    

    return (
        <ScrollView style={styles.container}>
            <SearchForm/>
            <FlightCard departure={'EZE'} departureTime={'1.30'} destination={'MIA'} destinationTime={'18.04'} fare={'USD 913'}/>
            <FlightCard departure={'EZE'} departureTime={'1.30'} destination={'MIA'} destinationTime={'13.30'} fare={'USD 1100'}/>
            <FlightCard departure={'EZE'} departureTime={'5.30'} destination={'MIA'} destinationTime={'16.00'} fare={'USD 967'}/>
            <FlightCard departure={'EZE'} departureTime={'13.40'} destination={'MIA'} destinationTime={'01.10'} fare={'USD 899'}/>
            <FlightCard departure={'EZE'} departureTime={'7.40'} destination={'MIA'} destinationTime={'18.04'} fare={'USD 1115'}/>
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
        </ScrollView>
    )
}

export default Flights;