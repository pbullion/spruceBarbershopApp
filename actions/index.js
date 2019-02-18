import {
    SIGN_IN_USER,
    SIGN_UP_USER,
    SIGN_OUT_USER,
    SIGN_IN_WAITLIST_USER,
    SIGN_UP_WAITLIST_USER,
    SIGN_OUT_WAITLIST_USER,
    ADD_STAFF_TO_WAITLIST,
    ADD_SERVICE1_TO_WAITLIST,
    ADD_SERVICE2_TO_WAITLIST,
    SET_WAITLIST_VIEW,
    REFRESH_TRUE,
    REFRESH_FALSE, RESET_WAITLIST
} from "../constants";

export const signInUser = (user, accessToken) => {
    const action = {
        type: SIGN_IN_USER,
        user,
        accessToken
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

export const signUpUser = (user, accessToken) => {
    const action = {
        type: SIGN_UP_USER,
        user,
        accessToken
    };
    return action
};

export const signInWaitListUser = (user) => {
    console.log(user);
    const action = {
        type: SIGN_IN_WAITLIST_USER,
        user
    };
    return action
};
export const signOutWaitListUser = () => {
    const action = {
        type: SIGN_OUT_WAITLIST_USER,
        user: {}
    };
    return action
};

export const signUpWaitListUser = (user) => {
    const action = {
        type: SIGN_UP_WAITLIST_USER,
        user
    };
    return action
};

export const refreshTrue = (boolean) => {
    const action = {
        type: REFRESH_TRUE,
        boolean
    };
    return action
};
export const refreshFalse = (boolean) => {
    const action = {
        type: REFRESH_FALSE,
        boolean
    };
    return action
};

export const addStaffMember = (staff) => {
    const action = {
        type: ADD_STAFF_TO_WAITLIST,
        staff
    };
    return action
};

export const addService1 = (service) => {
    const action = {
        type: ADD_SERVICE1_TO_WAITLIST,
        service
    };
    return action
};

export const addService2 = (service) => {
    const action = {
        type: ADD_SERVICE2_TO_WAITLIST,
        service
    };
    return action
};

export const resetWaitlist = () => {
    const action = {
        type: RESET_WAITLIST,
        service: {}
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
