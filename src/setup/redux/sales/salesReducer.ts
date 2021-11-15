import salesActionTypes from './salesActionTypes'

const INITIAL_STATE: any = []

type Action = {
  type: string
  payload?: any
}

const salesReducer = (state = INITIAL_STATE, {type, payload}: Action) => {
  switch (type) {
    case salesActionTypes.SAVE_SALES:
      console.log(type, payload);
      return [...state, ...payload]

    default:
      state = INITIAL_STATE
      return state
  }
}

export default salesReducer
