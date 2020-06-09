import axios from 'axios';

export function loadColor(){
    return(dispatch)=> {
        return axios.get("https://satsol-backend.herokuapp.com/user/all")
        .then((response => {
            dispatch(changeColor('#'+response.data.count))
            console.log(response)
        }))
       


    }

}

export function changeColor(color) {
    return {
        type: 'CHANGE_COLOR',
        color:color
    }
}

export function loginCredentials(data) {
    return {
        type: 'LOGIN',
        data:data
    }
}

export function loginSessionStart(token) {
    return {
        type: 'SESSION',
        token: token
    }
}