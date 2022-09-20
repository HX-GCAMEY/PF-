const initialState = {
    review: {}
}


export const reviewReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_REVIEW':
            return{
                ...state,
                review: action.payload
            }
        case 'POST_REVIEW':
            return {
                ...state,
                review: action.payload
            };
        default:
            return state
    }
}

