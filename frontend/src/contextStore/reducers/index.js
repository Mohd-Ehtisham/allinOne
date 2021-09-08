import { combineReducers } from "redux";
import { loginReducer } from "./LoginReducer";
import { PostReducer } from './PostReducer'
import { ArticleReducer } from "./ArticleReducer";
import { AdduserReducer } from "./AdduserReducer";
import { DelUser } from "./DeleteReducers";
import { Delpost } from "./DeleteReducers";

export const rootReducer = combineReducers({
    loginReducer:loginReducer,
    PostReducer:PostReducer,
    ArticleReducer:ArticleReducer,
    AdduserReducer:AdduserReducer,
    DelUser:DelUser,
    Delpost:Delpost
})