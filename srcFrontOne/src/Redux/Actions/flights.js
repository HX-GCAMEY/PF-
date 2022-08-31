import {
    GET_FLIGHTS,
    GET_FLIGHTS_ERROR,
    GET_FLIGHTS_SUCCESS
} from "../Constants/flights";


export function getFlights(){
    return async function(dispatch){
        let res = await Axios.get("http://localhost:8000/flights");
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