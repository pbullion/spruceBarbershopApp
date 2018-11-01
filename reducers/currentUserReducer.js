import { SIGN_IN_USER } from "../constants";
// const user = (action) => {
// //     console.log('checking the action', action);
// //     return{
// //         currentUser: action.user
// //     }
// // };
const currentUser = (state = {}, action) => {
    console.log(state);
    let currentUser = null;
    switch(action.type) {
        case SIGN_IN_USER:
            currentUser = Object.assign(action.user, {'isLoggedIn': true});
            return currentUser;
        default:
            return state;
    }
};
export default currentUser;
