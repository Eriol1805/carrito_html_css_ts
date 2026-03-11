export const addToCart = (cart, product) => {
    const itemExist = cart.find((item) => item.id === product.id);
    if (itemExist) {
        return cart.map((item) => item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item);
    }
    else {
        const newItem = { ...product, quantity: 1 };
        return [...cart, newItem];
    }
};
export const increaseQuantity = (cart, id) => {
    return cart.map((item) => item.id === id && item.quantity < 12
        ? { ...item, quantity: item.quantity + 1 }
        : item);
};
export const decreaseQuantity = (cart, id) => {
    return cart.map((item) => item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item);
};
export const deleteItem = (cart, id) => {
    return cart.map((item) => item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item);
};
