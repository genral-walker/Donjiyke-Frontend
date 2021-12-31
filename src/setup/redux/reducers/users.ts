
const actionTypes = {
  USER_ADDED: 'USER_ADDED',
  NEW_USER_ADDED: 'NEW_USER_ADDED'
};

export const addUser = (data: any) => ({
  type: actionTypes.USER_ADDED,
  payload: data
});

export const addNewUSer = (data: any) => ({
  type: actionTypes.NEW_USER_ADDED,
  payload: data    
});


const INITIAL_STATE: any = []

type Action = {
  type: string
  payload?: any
}

const usersReducer = (state = INITIAL_STATE, { type, payload }: Action) => {
  switch (type) {
    case actionTypes.USER_ADDED:
      return [...payload]

    case actionTypes.NEW_USER_ADDED:
      return [...state, payload]

    default:
      return state
  }
}

export default usersReducer
