import React from "react";
import { useEffect } from "react";
import { Image, ScrollView, Text } from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getFlights } from "../../Redux/Actions/flights";
import SearchForm from "../SearchForm/SearchForm";
import FlightCard from "../FlightCard/FlightCard";


const Flights = () => {

    let dispatch = useDispatch();
    let allFlights = useSelector((state) => state.flightsReducers.flights);
    //console.log(allFlights)

    useEffect(() => {
        dispatch(getFlights())
    }, [dispatch]);


    return (
        <ScrollView style={styles.container}>
            {/* <SearchForm/> */}
            {/* <FlightCard departure={'EZE'} departureTime={'1.30'} destination={'MIA'} destinationTime={'18.04'} fare={'USD 913'} />
            <FlightCard departure={'EZE'} departureTime={'1.30'} destination={'MIA'} destinationTime={'13.30'} fare={'USD 1100'} />
            <FlightCard departure={'EZE'} departureTime={'5.30'} destination={'MIA'} destinationTime={'16.00'} fare={'USD 967'} />
            <FlightCard departure={'EZE'} departureTime={'13.40'} destination={'MIA'} destinationTime={'01.10'} fare={'USD 899'} />
            <FlightCard departure={'EZE'} departureTime={'7.40'} destination={'MIA'} destinationTime={'18.04'} fare={'USD 1115'} /> */}

            {allFlights.flights[0] && allFlights.flights.map(f =>
                <FlightCard
                    key={f._id}
                    departure={f.departure.city}
                    departureTime={f.departure.time}
                    destination={f.arrival.city}
                    destinationTime={f.arrival.time}
                    fare={f.defaultFare}
                />
            )}
        </ScrollView>
    )
}

export default Flights;