import { WAGERHISTORY, WAGERSTATUS, TOKENAMOUNT, SETFLIP } from "../constants/actionTypes";

const initialState = {
    wagerHistory: [],
    wagerStatus: "heads",
    tokenAmount: 0,
    flip: false,
}

const wagerReducer = (state = initialState, action) => {

    switch (action.type) {
        case WAGERHISTORY:
            return { ...state, wagerHistory: action?.data };
        case WAGERSTATUS:
            return { ...state, wagerStatus: action?.data };
        case TOKENAMOUNT:
            return { ...state, tokenAmount: action?.data };
        case SETFLIP:
            return { ...state, flip: action?.data };
        default:
            return state;
    }
}
export default wagerReducer;