
const actionTypes = {
  PAYMENTS_LOADED: 'PAYMENTS_LOADED',
  PAYMENT_UPDATED: 'PAYMENT_UPDATED',
  PAYMENT_ADDED: 'PAYMENT_ADDED'
};

export const loadPayments = (data: any) => ({
  type: actionTypes.PAYMENTS_LOADED,
  payload: data
});

export const updatePayment = (data: any) => ({
  type: actionTypes.PAYMENT_UPDATED,
  payload: data
});

export const addPayment = (data: any) => ({
  type: actionTypes.PAYMENT_ADDED,
  payload: data
});



const INITIAL_STATE: any = []

type Action = {
  type: string
  payload?: any
}

const paymentsReducer = (state = INITIAL_STATE, { type, payload }: Action) => {
  switch (type) {
    case actionTypes.PAYMENTS_LOADED:
      return [...payload]

    case actionTypes.PAYMENT_ADDED:
      return [...state, payload]

    // case actionTypes.STOCK_UPDATED:
    //   const filtred = state.filter((state: any) => state?.id !== payload?.id);
    //   const data = [...filtred, payload];
    //   return data.sort((a, b) => a.id - b.id);

    default:
      return state
  }
}

export default paymentsReducer
