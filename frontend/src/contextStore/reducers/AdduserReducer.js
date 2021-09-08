import { ADDUSER_STATECHANGE } from "../actions/Adduser"

const loginInitialState = {
    role:"",
    name:"",
    email:"",
    password:""
}

export const AdduserReducer = (state = loginInitialState, action)=>{
    switch(action.type){
        case ADDUSER_STATECHANGE:
            return{
                ...state,
                [action.payload.key]:action.payload.value
            }
        default:
            return state
    }
}