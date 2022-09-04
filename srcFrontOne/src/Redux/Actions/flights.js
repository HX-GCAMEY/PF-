import axios from 'axios'
import {
    GET_FLIGHTS,
    GET_FLIGHTS_ERROR,
    GET_FLIGHTS_SUCCESS
} from "../Constants/flights";


export function getFlights() {
    return async function (dispatch) {
        const res = await axios.get("http://192.168.0.3:5000/api/flights");
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