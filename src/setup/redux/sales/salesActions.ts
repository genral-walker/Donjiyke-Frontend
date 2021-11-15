
import salesActionTypes from './salesActionTypes'

export const saveSales = (data: any) => ({
    type: salesActionTypes.LOAD_SALES,
    payload: data
});

export const loadSales = () => ({
    type: salesActionTypes.SAVE_SALES,
});