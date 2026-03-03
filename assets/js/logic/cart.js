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
