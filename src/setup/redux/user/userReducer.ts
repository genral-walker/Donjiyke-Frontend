import {UserModel} from '../../../app/modules/auth/models/UserModel'
import userActionTypes from './userActionTypes'
import {} from './userUtils'

const INITIAL_STATE = {
  user: {
    id: 3,
    password: 'ewegfwef',
    email: 'lukmansanni60@gmail.com',
    name: 'walker',
    mobile: '08164344955',
    role: 'admin',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS99qly0iUeHsWnxHiMsrVVrHPjFh_Wma8NzHECqmmVXGc4mTDvEuz79s7Kgjfs49cYmII&usqp=CAU',
  } as UserModel,
}

type Action = {
  type: string
  payload?: any
}

const userReducer = (state = INITIAL_STATE, {type, payload}: Action) => {
  switch (type) {
    case userActionTypes.CART_ADDED:
      return {
        ...state,
      }

    default:
      return state
  }
}

export default userReducer
