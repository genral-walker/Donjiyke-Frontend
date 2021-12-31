
const actionTypes = {
  LEDGERS_LOADED: 'LEDGERS_LOADED',
  LEDGER_UPDATED: 'LEDGER_UPDATED',
  LEDGER_ADDED: 'LEDGER_ADDED'
};

export const loadLedgers = (data: any) => ({
  type: actionTypes.LEDGERS_LOADED,
  payload: data
});

export const updateLedger = (data: any) => ({
  type: actionTypes.LEDGER_UPDATED,
  payload: data
});

export const addLedger = (data: any) => ({
  type: actionTypes.LEDGER_ADDED,
  payload: data
});



const INITIAL_STATE: any = []

type Action = {
  type: string
  payload?: any
}

const ledgersReducer = (state = INITIAL_STATE, { type, payload }: Action) => {
  switch (type) {
    case actionTypes.LEDGERS_LOADED:
      return [...payload]

    case actionTypes.LEDGER_ADDED:
      return [...state, payload]

    // case actionTypes.STOCK_UPDATED:
    //   const filtred = state.filter((state: any) => state?.id !== payload?.id);
    //   const data = [...filtred, payload];
    //   return data.sort((a, b) => a.id - b.id);

    default:
      return state
  }
}

export default ledgersReducer
