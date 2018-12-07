import {ADD_STAFF_TO_WAITLIST, ADD_SERVICE_TO_WAITLIST, SET_WAITLIST_VIEW} from "../constants";

const initialState = {};

const waitListFlow = (state = initialState, action) => {
    switch(action.type) {
        case ADD_STAFF_TO_WAITLIST:
            return Object.assign({}, state, {
                staff: action.staff,
                waitListView: "Service"
            });
        case ADD_SERVICE_TO_WAITLIST:
            return Object.assign({}, state, {
                service: action.service
            });
        case SET_WAITLIST_VIEW:
            return Object.assign({}, state, {
                waitListView: action.view
            });
        default:
            return state;
    }
};
export default waitListFlow;
