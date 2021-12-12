
const actionTypes = {
  LOAD_SALES: 'LOAD_SALES',
  SAVE_SALES: 'SAVE_SALES',
};

export const saveSales = (data: any) => ({
  type: actionTypes.LOAD_SALES,
  payload: data
});

export const loadSales = () => ({
  type: actionTypes.SAVE_SALES,
});




const INITIAL_STATE: any = []

type Action = {
  type: string
  payload?: any
}

const salesReducer = (state = INITIAL_STATE, { type, payload }: Action) => {
  switch (type) {
    case actionTypes.SAVE_SALES:
      console.log(type, payload);
      return [...state, ...payload]

    default:
      return state
  }
}

export default salesReducer
