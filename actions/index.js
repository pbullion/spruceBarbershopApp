import {
    SIGN_IN_USER,
    SIGN_UP_USER
}
from "../constants";
import axios from 'axios';

export const signInUser = (user) => {
    const action = {
        type: SIGN_IN_USER,
        user
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
