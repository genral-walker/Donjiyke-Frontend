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
    avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FUser_(computing)&psig=AOvVaw3yPMDPcHAYoiY9Y0_Npafj&ust=1635783644131000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCICntYyH9fMCFQAAAAAdAAAAABAD',
    auth: {},
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
