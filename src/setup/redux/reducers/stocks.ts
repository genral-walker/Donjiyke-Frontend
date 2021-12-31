
const actionTypes = {
  LOAD_STOCKS: 'LOAD_STOCKS',
  STOCKS_ADDED: 'STOCKS_ADDED',
  STOCK_UPDATED: 'STOCK_UPDATED',
  NEW_STOCK_ADDED: 'NEW_STOCK_ADDED'
};

export const addStock = (data: any) => ({
  type: actionTypes.STOCKS_ADDED,
  payload: data
});

export const updateStock = (data: any) => ({
  type: actionTypes.STOCK_UPDATED,
  payload: data
});

export const addNewStock = (data: any) => ({
  type: actionTypes.NEW_STOCK_ADDED,
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

    case actionTypes.NEW_STOCK_ADDED:
      return [...state, payload]

    case actionTypes.STOCK_UPDATED:
      const filtred = state.filter((state: any) => state?.id !== payload?.id);
      const data = [...filtred, payload];
      return data.sort((a, b) => a.id - b.id);

    default:
      return state
  }
}

export default stocksReducer
