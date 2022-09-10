import {
    GET_FLIGHTS,
    GET_FLIGHTS_SUCCESS,
    GET_FLIGHTS_ERROR,
    GET_FLIGHTS_BY_ROUTE,
    CLEAR_GET_FLIGHTS_BY_ROUTE,
    GET_CITIES,
    SORT_PRICE
} from "../Constants/flights";

const initialState = {
    flights: [],
    backup: [],
    flightsByRoute: [],
    getCities: [],
    isFetching: false,  //para controlar si se esta realizando el fetch a la api
    error: false //para cuando no se esta realizando el fetch a la api
}


export default flightsReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_FLIGHTS:
            return {
                ...state,
                flights: action.payload,
                backup: action.payload,
                isFetching: true
            }
        case GET_FLIGHTS_BY_ROUTE:
            return {
                ...state,
                flightsByRoute: action.payload,
            }
        case CLEAR_GET_FLIGHTS_BY_ROUTE:
            return {
                ...state,
                flightsByRoute: action.payload
            }
        case GET_CITIES:
            return {
                ...state,
                getCities: action.payload
            }
        case GET_FLIGHTS_SUCCESS:
            return {
                ...state,
                flights: action.payload,
                isFetching: false
            }
        case GET_FLIGHTS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        case SORT_PRICE:
            function compareHour(a, b) {
                let time1 = parseFloat(a.departure.time.replace(':', '.').replace(/[^\d.-]/g, ''))
                let time2 = parseFloat(b.departure.time.replace(':', '.').replace(/[^\d.-]/g, ''))
                if (action.payload === 'earlier') {
                    if (time1 < time2) return -1
                    if (time1 > time2) return 1
                    return 0;
                }
                else if (action.payload === 'later') {
                    if (time1 > time2) return -1
                    if (time1 < time2) return 1
                    return 0
                }
            }
            let sortHr = []
            let sort =
                action.payload === 'high'
                    ? state.flightsByRoute?.sort((a, b) => {
                        if (a.defaultFare > b.defaultFare) {
                            return 1
                        }
                        if (b.defaultFare > a.defaultFare) {
                            return -1
                        }
                        return 0
                    })
                    : action.payload === 'low'
                        ? state.flightsByRoute?.sort((a, b) => {
                            if (a.defaultFare > b.defaultFare) {
                                return -1
                            }
                            if (b.defaultFare > a.defaultFare) {
                                return 1
                            }
                            return 0
                        })
                        : action.payload === 'earlier' || action.payload === 'later'
                            ? sortHr = state.flightsByRoute.sort(compareHour)
                            : state.flightsByRoute ? state.flightsByRoute : null
            let final = action.payload === 'high' || action.payload === 'low'
                ? sort : sortHr
            return {
                ...state,
                flightsByRoute: final
            }
        default:
            return state
    }
}