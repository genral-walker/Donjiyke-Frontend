
const actionTypes = {
  USER_ADDED: 'USER_ADDED',
  NEW_USER_ADDED: 'NEW_USER_ADDED',
  USER_DELETED: 'USER_DELETED'
};

export const addUser = (data: any) => ({
  type: actionTypes.USER_ADDED,
  payload: data
});

export const addNewUSer = (data: any) => ({
  type: actionTypes.NEW_USER_ADDED,
  payload: data    
});

export const deleteUser = (id: string) => ({
  type: actionTypes.USER_DELETED,
  payload: id    
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

      case actionTypes.USER_DELETED:
        return state.filter((user: any) => user.id !== payload)  

    default:
      return state
  }
}

export default usersReducer
