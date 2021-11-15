
import userActionTypes from './userActionTypes'

export const loginIn = (user: object) => ({
    type: userActionTypes.USER_LOGGED_IN,
    payload: user
});

export const logOut = () => ({
    type: userActionTypes.USER_LOGGED_OUT,
});