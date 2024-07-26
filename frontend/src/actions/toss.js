import * as api from '../api';
import { SETFLIP, TOKENAMOUNT, WAGERHISTORY, WAGERSTATUS } from '../constants/actionTypes';
import * as messages from '../messages'

export const wagerRequest = (flip, wagerAmount, wagering) => async (dispatch) => {
    try {
        const param = {
            wager: wagerAmount,
            choice: wagering
        };
        const { data } = await api.wagerRequest(param);
        data.win ? messages.info("You are Winner") : messages.info("You are looser");;
        dispatch({ type: WAGERHISTORY, data: data.recentWagers })
        dispatch({ type: WAGERSTATUS, data: data.result })
        dispatch({ type: TOKENAMOUNT, data: data.token_amount })
        dispatch({ type: SETFLIP, data: flip })

    } catch (error) {
        dispatch({ type: WAGERSTATUS }, "heads")
        messages.error(error.response.data.message);
    }
};

export const recentWagers = () => async (dispatch) => {
    try {
        const { data } = await api.recentWagers();
        dispatch({ type: WAGERHISTORY, data: data })
    } catch (error) {
        dispatch({ type: WAGERSTATUS }, "heads")
        messages.error(error.response.data.message);
    }
}


