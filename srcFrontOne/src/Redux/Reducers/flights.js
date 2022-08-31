import{
    GET_FLIGHTS,
    GET_FLIGHTS_SUCCESS,
    GET_FLIGHTS_ERROR
} from "../Constants/flights";

const initialState ={
    flights: [],
    backup: [],
    isFetching: false,  //para controlar si se esta realizando el fetch a la api
    error: false //para cuando no se esta realizando el fetch a la api
}



export default flightsReducers = (state = initialState, action ) => {
    switch(action.type){
        case GET_FLIGHTS:
        return {
            ...state,
            flights: action.payload,
            backup: action.payload,
            isFetching: true
        }
        case GET_FLIGHTS_SUCCESS: 
        return{
            ...state,
            flights: action.payload,
            isFetching: false
        }
        case GET_FLIGHTS_ERROR:
            return{
                ...state,
                isFetching: false,
                error: true
            }
        default: 
        return state  
    }
}