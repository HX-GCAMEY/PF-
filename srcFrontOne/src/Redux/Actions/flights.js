const IP_URL = "192.168.0.3"

import axios from 'axios'
import {
    GET_FLIGHTS,
    GET_FLIGHTS_ERROR,
    GET_FLIGHTS_SUCCESS,
    GET_FLIGHTS_BY_ROUTE
} from "../Constants/flights";


export function getFlights() {
    return async function (dispatch) {
        const res = await axios.get(`http://${IP_URL}:5000/api/flights`);
        dispatch({
            type: GET_FLIGHTS,
            payload: res.data
        })
    }
}

export function getFlightsByRoute(departure, arrival, date) {
    return async function (dispatch) {
        if (!date) {
            const res = await axios.get(
                `http://${IP_URL}:5000/api/flights/search?departureCity=${departure}?arrivalCity=${arrival}`
            )
            dispatch({
                type: GET_FLIGHTS_BY_ROUTE,
                payload: res.data
            })
        } else {

            const res = await axios.get(
                `http://${IP_URL}:5000/api/flights/search?departureCity=${departure}?arrivalCity=${arrival}?departureDate=${date}`
            )
            dispatch({
                type: GET_FLIGHTS_BY_ROUTE,
                payload: res.data
            })
        }
    }
}

export const getSuccess = payload => {
    return {
        type: GET_FLIGHTS_SUCCESS,
        payload
    }
}



export const getError = () => {
    return {
        type: GET_FLIGHTS_ERROR
    }
}