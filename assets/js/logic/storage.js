const CART_STORAGE_KEY = 'shopping_cart';
export const saveCartToStorage = (cart) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};
export const loadCartFromStorage = () => {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
};
