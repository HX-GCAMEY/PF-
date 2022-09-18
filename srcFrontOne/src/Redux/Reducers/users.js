const initialState = {
    session: {}
}


export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_USER':
            return{
                ...state,
                session: action.payload
            }
        case 'UPDATE_USER':
            return{
                ...state,
                session: action.payload
            }
        case 'GOOGLE_REGISTER':
            return{
                ...state,
                session: action.payload
            }
        case 'GOOGLE_LOGIN':
            return{
                ...state,
                session: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                session: action.payload
            }
        case 'DELETE':
            return{
                ...state,
                session: {}
            }
        default:
            return state
    }
}