import { LOGIN_STATECHANGE } from "../actions/LoginAction";

const loginInitialState = {
    email:"",
    password:""
}

export const loginReducer = (state = loginInitialState, action)=>{
    switch(action.type){
        case LOGIN_STATECHANGE:
            return{
                ...state,
                [action.payload.key]:action.payload.value
            }
        default:
            return state
    }
}