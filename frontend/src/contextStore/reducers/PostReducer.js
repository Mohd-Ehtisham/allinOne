import { POST_STATECHANGE } from "../actions/PostAction";

const postInitialState = {
    title:"",
    desc:""
}

export const PostReducer = (state = postInitialState, action)=>{
    switch(action.type){
        case POST_STATECHANGE:
            return{
                ...state,
                [action.payload.key]:action.payload.value
            }
        default:
            return state
    }
}