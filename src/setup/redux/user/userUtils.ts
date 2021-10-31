
let cartsForQuantityandAmount = [];

export const addItemToCart = (products, cartLists, productID) => {

    const itemAlreadyInCart = cartLists.find(cart => cart.id === productID);

    if (itemAlreadyInCart) {

        const updatedArray = cartLists.map(cart => {
            if (cart.id === itemAlreadyInCart.id) {
                cart.quantityPurchased !== cart.stock ?
                    ++cart.quantityPurchased :
                    cart.stockExceeded = true;

                cart.realPrice = cart.price * cart.quantityPurchased;
                return cart;
            } else {
                return cart
            }
        });

        cartsForQuantityandAmount = updatedArray;

        return updatedArray;

    } else {
        const newCartItem = products.find(product => product.id === productID);
        newCartItem.quantityPurchased = 1;

        cartsForQuantityandAmount = [...cartLists, newCartItem];

        return [...cartLists, newCartItem];
    }
};



export const IncrementQuantity = (cartLists, productID) => {

    const incrementedCartList = cartLists.map(cart => {

        if (cart.id === productID) {
            cart.quantityPurchased !== cart.stock ?
                ++cart.quantityPurchased :
                cart.stockExceeded = true;

            cart.realPrice = cart.price * cart.quantityPurchased;
            return cart;
        } else {
            return cart
        }

    });

    cartsForQuantityandAmount = incrementedCartList;

    return incrementedCartList;
};


export const decrementQuantity = (cartLists, productID) => {

    const decrementedCartList = cartLists.map(cart => {
        if (cart.id === productID && cart.quantityPurchased > 0) {
            --cart.quantityPurchased;
            cart.stockExceeded = false;

            cart.realPrice = cart.price * cart.quantityPurchased;
            return cart;
        } else {
            return cart
        }

    });

    const newArray = decrementedCartList.filter(cart => cart.quantityPurchased > 0);

    cartsForQuantityandAmount = newArray;

    return newArray;
}


export const deleteCart = (cartLists, productID) => {
    const newArray = cartLists.filter(cart => cart.id !== productID);

    cartsForQuantityandAmount = newArray;

    return newArray;
};


export const calculateOverallQuantity = () => {
    if (cartsForQuantityandAmount.length) {
        return cartsForQuantityandAmount.reduce((acummulator, { quantityPurchased }) => acummulator + quantityPurchased, 0);
    } else {
        return 0
    }
};


export const calculateOverallPrice = () => {
    if (cartsForQuantityandAmount.length) {
        return cartsForQuantityandAmount.reduce((acummulator, { realPrice, price }) => {
            return acummulator + (realPrice ? realPrice : price)
        }, 0);
    } else {
        return 0
    }
};
