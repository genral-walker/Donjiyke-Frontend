
import userActionTypes from './userActionTypes'

export const addToCart = productID => ({
    type: userActionTypes.CART_ADDED,
    payload: productID
});
