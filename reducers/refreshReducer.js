import {REFRESH_TRUE, REFRESH_FALSE} from "../constants";

const refresh = (state = {}, action) => {
    // console.log(state);
    let refresh = null;
    switch(action.type) {
        case REFRESH_TRUE:
            refresh = Object.assign({refreshStatus: true});
            return refresh;
        case REFRESH_FALSE:
            refresh = Object.assign({refreshStatus: false});
            return refresh;
        default:
            return state;
    }
};
export default refresh;
