import { ARTICLE_STATE } from "../actions/Articles";

const loginInitialState = {
    Data:[]
}

export const ArticleReducer = (state = loginInitialState, action)=>{
    switch(action.type){
        case ARTICLE_STATE:
            return{
                ...state,
                [action.payload.key]:action.payload.value
            }
        default:
            return state
    }
}