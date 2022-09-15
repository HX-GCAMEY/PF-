import {
    GET_FLIGHTS,
    GET_ALL_FLIGHTS,
    GET_FLIGHTS_SUCCESS,
    GET_FLIGHTS_ERROR,
    GET_FLIGHTS_BY_ROUTE,
    CLEAR_GET_FLIGHTS_BY_ROUTE,
    GET_CITIES,
    SORT_PRICE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SET_TICKET,
    CLEAR_TICKETS,
    POST_TICKET,
} from "../Constants/flights";

const initialState = {
    flights: [],
    allFlights: [],
    cart: [], //estado global para el carrito
    tickets: [],
    backup: [],
    flightsByRoute: {},
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
        case GET_ALL_FLIGHTS:
            return{
                ...state,
                allFlights: action.payload
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
        case ADD_TO_CART:
            let info = state.allFlights
            let bookedFlight = info.find(f => f._id === action.payload)
            return {
                ...state,
                cart: [...state.cart, bookedFlight]
            }
        case SET_TICKET:
            console.log('este es el reducer', state.tickets)
            return {
                ...state,
                tickets: [...state.tickets, action.payload]
            }
        case CLEAR_TICKETS:
            return {
                ...state,
                tickets: [],
            }
        case POST_TICKET:
            return {

            }
        case REMOVE_FROM_CART:
            return {
                ...state,
            }
        case CLEAR_CART:
            return {
                ...state,
                cart: [],
            }
        case SORT_PRICE:
            let flag = 0
            let sortHr = []
            let data = []

            state.flightsByRoute.matchedFlights && state.flightsByRoute.matchedFlights.length > 0
                ? (data = state.flightsByRoute.matchedFlights, flag = 1)
                : state.flightsByRoute.sameDateFlights
                    ? (data = state.flightsByRoute.sameDateFlights, flag = 2)
                    : null;

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

            let sort =
                action.payload === 'low'
                    ? data && data?.sort((a, b) => {
                        if (a.defaultFare > b.defaultFare) {
                            return 1
                        }
                        if (b.defaultFare > a.defaultFare) {
                            return -1
                        }
                        return 0
                    })
                    : action.payload === 'high'
                        ? data && data?.sort((a, b) => {
                            if (a.defaultFare > b.defaultFare) {
                                return -1
                            }
                            if (b.defaultFare > a.defaultFare) {
                                return 1
                            }
                            return 0
                        })
                        : action.payload === 'earlier' || action.payload === 'later'
                            ? sortHr = data?.sort(compareHour)
                            : data ? data : null
            let final = action.payload === 'high' || action.payload === 'low'
                ? sort : sortHr
            final = flag === 1 ? { 'matchedFlights': data } :
                flag === 2 ? { 'sameDateFlights': data } : data

            return {
                ...state,
                flightsByRoute: final
            }
        default: {
            return state
        }
    }
}