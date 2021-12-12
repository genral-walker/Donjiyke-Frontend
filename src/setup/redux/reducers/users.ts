
const actionTypes = {
  USER_ADDED: 'USER_ADDED',
};

export const addUser = (data: any) => ({
  type: actionTypes.USER_ADDED,
  payload: data
});
    
// export const loadSales = () => ({
//   type: actionTypes.LOAD_STOCKS,
// });


const INITIAL_STATE: any = []

type Action = {
  type: string
  payload?: any
}

const usersReducer = (state = INITIAL_STATE, { type, payload }: Action) => {
  switch (type) {
    case actionTypes.USER_ADDED:
      return [...payload]    

    default:
      return state
  }
}

export default usersReducer
