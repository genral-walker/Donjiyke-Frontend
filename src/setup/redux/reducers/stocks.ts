
const actionTypes = {
  LOAD_STOCKS: 'LOAD_STOCKS',
  STOCKS_ADDED: 'STOCKS_ADDED',
};

export const addStock = (data: any) => ({
  type: actionTypes.STOCKS_ADDED,
  payload: data
});
    
export const loadSales = () => ({
  type: actionTypes.LOAD_STOCKS,
});



const INITIAL_STATE: any = []

type Action = {
  type: string
  payload?: any
}

const stocksReducer = (state = INITIAL_STATE, { type, payload }: Action) => {
  switch (type) {
    case actionTypes.STOCKS_ADDED:
      return [...payload]

    default:
      return state
  }
}

export default stocksReducer
