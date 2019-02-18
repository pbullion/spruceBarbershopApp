import {SIGN_IN_WAITLIST_USER, SIGN_OUT_WAITLIST_USER, SIGN_UP_WAITLIST_USER} from "../constants";

const waitListUser = (state = {}, action) => {
    let waitListUser = null;
    switch(action.type) {
        case SIGN_IN_WAITLIST_USER:
            waitListUser = Object.assign(action.user);
            return waitListUser;
        case SIGN_UP_WAITLIST_USER:
            waitListUser = Object.assign(action.user);
            return waitListUser;
        case SIGN_OUT_WAITLIST_USER:
            waitListUser = Object.assign({});
            return waitListUser;
        default:
            return state;
    }
};
export default waitListUser;
