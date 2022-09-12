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
        default:
            return state
    }
}