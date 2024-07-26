import { combineReducers } from "redux";
import loginReducer from "./login";
import wagerReducer from "./wager";
export default combineReducers({
    loginReducer,
    wagerReducer
});
