let defaultState ={
    color: 'blue',
    loginData: {},
    token: ''
}

const mainReducer = (state=defaultState,action)=> {

    switch(action.type){

        case 'CHANGE_COLOR':
            return {
                ...state,
                color:action.color
            }
        case 'LOGIN':
            return {
                ...state,
                loginData: action.data
            }
        case 'SESSION':
            return {
                ...state,
                token: action.token
            }
        default: 
            return {
                ...state
            }
    }
}

export default mainReducer;