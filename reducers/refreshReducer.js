import {REFRESH_TRUE, REFRESH_FALSE} from "../constants";

const refresh = (state = {}, action) => {
    console.log(state);
    let refresh = null;
    switch(action.type) {
        case REFRESH_TRUE:
            refresh = true;
            return refresh;
        case REFRESH_FALSE:
            refresh = false;
            return refresh;
        default:
            return state;
    }
};
export default refresh;
