import { ScrollView } from "react-native";
import React from "react";
import TicketCard from './TicketCard';

const MyTickets = () => {

    const data = [
        {
          "_id": "293464591147",
          "flight_id": "63126f6365bdb0e76250689e",
          "type": "basic",
          "departDate": "2022-09-10",
          "arrivalDate": "2022-09-11",
          "fare": 296000
        },
        {
          "_id": "35333010862107",
          "flight_id": "6310c66c32f26de97cc0a441",
          "type": "basic",
          "departDate": "2022-09-29",
          "arrivalDate": "2022-09-30",
          "fare": 162000
        },{
            "_id": "293464591147",
            "flight_id": "63126f6365bdb0e76250689e",
            "type": "basic",
            "departDate": "2022-09-10",
            "arrivalDate": "2022-09-11",
            "fare": 296000
          }
    ]

    return (

        <ScrollView>
            {
                data[0] && data.map( item =>
                    <TicketCard key={Math.random()} item={item} />
                )
            }
        </ScrollView>
    )
};

export default MyTickets;