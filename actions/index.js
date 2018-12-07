import {
    SIGN_IN_USER,
    SIGN_UP_USER,
    SIGN_OUT_USER,
    ADD_STAFF_TO_WAITLIST,
    ADD_SERVICE_TO_WAITLIST,
    SET_WAITLIST_VIEW
} from "../constants";

export const signInUser = (user) => {
    const action = {
        type: SIGN_IN_USER,
        user
    };
    return action
};
export const signOutUser = () => {
    const action = {
        type: SIGN_OUT_USER,
        user: {}
    };
    return action
};

export const signUpUser = (user) => {
    const action = {
        type: SIGN_UP_USER,
        user
    };
    return action
};

export const addStaffMember = (staff) => {
    console.log('********************** staff', staff);
    const action = {
        type: ADD_STAFF_TO_WAITLIST,
        staff
    };
    return action
};

export const addService = (service) => {
    const action = {
        type: ADD_SERVICE_TO_WAITLIST,
        service
    };
    return action
};

export const setWaitListView = (view) => {
    const action = {
        type: SET_WAITLIST_VIEW,
        view
    };
    return action
};
