import {
    ADD_STAFF_TO_WAITLIST,
    ADD_SERVICE1_TO_WAITLIST,
    ADD_SERVICE2_TO_WAITLIST,
    SET_WAITLIST_VIEW,
    RESET_WAITLIST
} from "../constants";

const initialState = {};

const waitListFlow = (state = initialState, action) => {
    switch(action.type) {
        case ADD_STAFF_TO_WAITLIST:
            return Object.assign({}, state, {
                staff: action.staff,
                mobile_join: true,
                waitListView: "Service"
            });
        case ADD_SERVICE1_TO_WAITLIST:
            return Object.assign({}, state, {
                service1: action.service
            });
        case ADD_SERVICE2_TO_WAITLIST:
            return Object.assign({}, state, {
                service2: action.service
            });
        case SET_WAITLIST_VIEW:
            return Object.assign({}, state, {
                waitListView: action.view
            });
        case RESET_WAITLIST:
            return Object.assign({}, state, {
                service2: null
            });
        default:
            return state;
    }
};
export default waitListFlow;
