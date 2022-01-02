import { UserModel } from '../../../app/modules/auth/models/UserModel'

const actionTypes = {
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',
  PROFILE_UPDATED: 'PROFILE_UPDATED'
};

export const loginIn = (user: object) => ({
  type: actionTypes.USER_LOGGED_IN,
  payload: user
});

export const logOut = () => ({
  type: actionTypes.USER_LOGGED_OUT,
});

export const updateProfile = (user: object) => ({
  type: actionTypes.PROFILE_UPDATED,
  payload: user
});




const INITIAL_STATE: UserModel = {
  auth: {
    accessToken: '',
    isAuthorized: false,
  },
}

type Action = {
  type: string
  payload?: any
}



const userReducer = (state = INITIAL_STATE, { type, payload }: Action) => {
  switch (type) {
    case actionTypes.USER_LOGGED_IN:
      const payloadData = {
        ...payload.user,
        avater: payload.image_path,
        auth: {
          accessToken: payload.token,
          isAuthorized: true,
        },
      };
      return payload.user ? payloadData : payload;  

    case actionTypes.PROFILE_UPDATED:
      window.localStorage.setItem('user', JSON.stringify({...state, ...payload}));      
      return {...state, ...payload};

    case actionTypes.USER_LOGGED_OUT:
      window.localStorage.clear();
      window.location.reload();
      return INITIAL_STATE;

    default:
      return state
  }
}

export default userReducer
