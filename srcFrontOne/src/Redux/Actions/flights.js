
import {
    GET_FLIGHTS,
    GET_FLIGHTS_ERROR,
    GET_FLIGHTS_SUCCESS
} from "../Constants/flights";


export function getFlights() {
    return async function (dispatch) {
        const res = await globalThis.fetch.get("http://localhost:8000/flights");
        const json = await res.json()
        dispatch({
            type: GET_FLIGHTS,
            payload: json.data
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