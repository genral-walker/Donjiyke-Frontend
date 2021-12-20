
const actionTypes = {
  LOAD_SALES: 'LOAD_SALES',
  SALES_ADDED: 'SALES_ADDED',
  NEW_SALE_ADDED: 'NEW_SALE_ADDED'
};

export const addSales = (data: any) => ({
  type: actionTypes.SALES_ADDED,
  payload: data
});

export const addNewSale = (data: any) => ({
  type: actionTypes.NEW_SALE_ADDED,
  payload: data
});

export const loadSales = () => ({
  type: actionTypes.LOAD_SALES,
});


const INITIAL_STATE: any = []

type Action = {
  type: string
  payload?: any
}

const salesReducer = (state = INITIAL_STATE, { type, payload }: Action) => {
  switch (type) {
    case actionTypes.SALES_ADDED:
      return [...payload]

    case actionTypes.NEW_SALE_ADDED:
      return [...state, payload]

    default:
      return state
  }
}

export default salesReducer
