const initialState = {
    session: {},
    favorites: [],
    favsToDb: {},
    ticketsProfile: []
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                session: action.payload
            }
        case 'UPDATE_USER':
            return {
                ...state,
                session: action.payload
            }
        case 'GOOGLE_REGISTER':
            return {
                ...state,
                session: action.payload
            }
        case 'GOOGLE_LOGIN':
            return {
                ...state,
                session: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                session: action.payload
            }
        case 'DELETE':
            return {
                ...state,
                session: {}
            }
        //estado global
        case 'SET_FAVORITES':
            return {
                ...state,
                favorites: [action.payload, ...state.favorites]
            }
        case 'DELETE_FAVORITES':
            const filterFav = state.favorites.filter((flight) => flight.flyId !== action.payload)
            return {
                ...state,
                favorites: filterFav
            }
        //database
        case 'POST_FAVORITES':
            return {
                ...state
            }
        case 'GET_FAVORITES':
            //console.log('reducer\n', action.payload)
            return {
                ...state,
                favorites: action.payload
            }
        //Tickets profile
        case 'GET_TICKETS':
            //console.log("b: ",action.payload);
            return {
                ...state,
                ticketsProfile: action.payload
            }

        default:
            return state
    }
}