import {SIGN_IN_USER, SIGN_OUT_USER, SIGN_UP_USER} from "../constants";

const currentUser = (state = {}, action) => {
    let currentUser = null;
    switch(action.type) {
        case SIGN_IN_USER:
            currentUser = Object.assign(action.user, {accessToken: action.accessToken}, {'isLoggedIn': true});
            return currentUser;
        case SIGN_UP_USER:
            currentUser = Object.assign(action.user, {accessToken: action.accessToken}, {'isLoggedIn': true});
            return currentUser;
        case SIGN_OUT_USER:
            currentUser = Object.assign({},{'isLoggedIn': false});
            return currentUser;
        default:
            return state;
    }
};
export default currentUser;
