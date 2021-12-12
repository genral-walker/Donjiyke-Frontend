import { UserModel } from '../../../app/modules/auth/models/UserModel'

const actionTypes = {
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',
};

export const loginIn = (user: object) => ({
  type: actionTypes.USER_LOGGED_IN,
  payload: user
});

export const logOut = () => ({
  type: actionTypes.USER_LOGGED_OUT,
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

/*
{
    "user": {
        "id": 1,
        "name": null,
        "mobile": null,
        "role": "staff",
        "email": "admin@demo.com",
        "image_path": null,
        "email_verified_at": null,
        "created_at": "2021-11-03T16:59:21.000000Z",
        "updated_at": "2021-11-03T16:59:21.000000Z"
    },
    "token": "3|dpOUFcBJJQ9wmMWqSqSNT1Vycb4yuDHX1UR2ybUk"
}
*/

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
      return payloadData;


    case actionTypes.USER_LOGGED_OUT:
      window.localStorage.clear();
      window.location.reload();
      return INITIAL_STATE;

    default:
      return state
  }
}

export default userReducer
