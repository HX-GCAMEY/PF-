import axios from 'axios'
import {
    GET_FLIGHTS,
    GET_FLIGHTS_ERROR,
    GET_FLIGHTS_SUCCESS,
    SEARCH_FLIGHT
} from "../Constants/flights";


export function getFlights() {
    return async function (dispatch) {
        const res = await axios.get("http://192.168.0.13:5000/api/flights");
        dispatch({
            type: GET_FLIGHTS,
            payload: res.data
        })
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


export const searchFlights = (departureCity, arrivalCity) => {
    return async function (dispatch){
        let res = await axios.get(`http://192.168.0.13:5000/api/flights?departure=${departureCity}?arrival=${arrivalCity}`);
        console.log('entre', res.data)
         dispatch({
            type: SEARCH_FLIGHT,
            payload: res.data
        })
    }
}