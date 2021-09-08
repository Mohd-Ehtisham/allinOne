import {DELETEUSER_STATECHANGE} from '../actions/DeleteActions';
import { DELETEPOST_STATECHANGE } from '../actions/DeleteActions';

const DELuserloginInitialState = {
   Useremail:"",
}

const DELpostloginInitialState = {
    title:"",
 }

export const DelUser = (state = DELuserloginInitialState, action)=>{
    switch(action.type){
        case DELETEUSER_STATECHANGE:
            return{
                ...state,
                [action.payload.key]:action.payload.value
            }
        default:
            return state
    }
}

export const Delpost = (state = DELpostloginInitialState, action)=>{
    switch(action.type){
        case DELETEPOST_STATECHANGE:
            return{
                ...state,
                [action.payload.key]:action.payload.value
            }
        default:
            return state
    }
}