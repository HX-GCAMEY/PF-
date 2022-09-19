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
        let res = await axios.put('https://flymatepf.herokuapp.com/api/users/updateProfile', {email, profile})
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


export function googleLogin(email){
    return async function(dispatch){
        let res = await axios.post('https://flymatepf.herokuapp.com/api/users/googleLogin', email)
        dispatch({
            type: 'GOOGLE_LOGIN',
            payload: res.data
        })
    }
}

export function userLogout(email){
    return async function(dispatch){
        let res = await axios.post('https://flymatepf.herokuapp.com/api/users/logout', {user: email})
        dispatch({
            type: 'LOGOUT',
            payload: res.data
        })
    }
}


export function userDelete(email){
    return async function(dispatch){
        let res = await axios.post("https://flymatepf.herokuapp.com/api/users/delete", email)
        dispatch({
            type: 'DELETE',
            payload: res.data
        })
    }
}