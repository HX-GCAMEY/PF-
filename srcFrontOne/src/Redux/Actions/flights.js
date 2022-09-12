const IP_URL = "http://192.168.0.3:5000"
const BACK_NET = "https://flymatepf.herokuapp.com"

import axios from 'axios'
import {
    GET_FLIGHTS,
    GET_FLIGHTS_ERROR,
    GET_FLIGHTS_SUCCESS,
    GET_FLIGHTS_BY_ROUTE,
    CLEAR_GET_FLIGHTS_BY_ROUTE,
    GET_CITIES,
    SORT_PRICE
} from "../Constants/flights";


export function getFlights() {
    return async function (dispatch) {
        const res = await axios.get(`${BACK_NET}/api/flights`);
        // console.log(res.data)
        dispatch({
            type: GET_FLIGHTS,
            payload: res.data
        })
    }
}

export function getCities() {
    return async function (dispatch) {
        const res = await axios.get(`${BACK_NET}/api/flights/cities`)
        dispatch({
            type: GET_CITIES,
            payload: res.data
        })
    }
}

export function getFlightsByRoute(departure, arrival, date) {
    return async function (dispatch) {
        const res = await axios.get(`${BACK_NET}/api/flights/search?departureCity=${departure}&arrivalCity=${arrival}&departureDate=${date}`);
        dispatch({
            type: GET_FLIGHTS_BY_ROUTE,
            payload: res.data
        })
    }
}

export function clearGetFlightsByRoute() {
    return async function (dispatch) {
        dispatch({
            type: CLEAR_GET_FLIGHTS_BY_ROUTE,
            payload: []
        })
    }
}

export function sortAction(payload) {
    return async function (dispatch) {
        dispatch({
            type: SORT_PRICE,
            payload: payload
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