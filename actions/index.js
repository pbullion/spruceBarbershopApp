import { SIGN_IN_USER } from "../constants";

export const signInUser = (user) => {
    const action = {
        type: SIGN_IN_USER,
        user
    };
    return action
};
