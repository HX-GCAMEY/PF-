import axios from "axios";


export function getUser(email){
    return async function(dispatch){
        let res = await axios.get(`https://flymatepf.herokuapp.com/api/users/findUser/${email}`)
        dispatch({
            type: "GET_USER",
            payload: res.data
        })
    }
}


export function updateUser (email, profile){
    return async function(dispatch){
        let res = await axios.put('https://flymatepf.herokuapp.com/api/users/updateUser', {email, profile})
        dispatch({
            type: 'UPDATE_USER',
            payload: res.data
        })
    }
}


export function googleRegister(email){
    return async function(dispatch){
        let res = await axios.post('https://flymatepf.herokuapp.com/api/users/googleRegister', email)
        dispatch({
            type: 'GOOGLE_REGISTER',
            payload: res.data
        })
    }
}
