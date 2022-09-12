import axios from "axios";


export function getUser(email){
    return async function(dispatch){
        let res = await axios.get('https://flymatepf.herokuapp.com/api/users/findUser', email)
        dispatch({
            type: "GET_USER",
            payload: res.data
        })
    }
}