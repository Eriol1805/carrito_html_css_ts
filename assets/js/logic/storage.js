const CART_STORAGE_KEY = 'shopping_cart';
export const saveCartToStorage = (cart) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};
export const loadCartFromStorage = () => {
    try {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    }
    catch {
        console.warn("Failed to parse cart from storage, resetting.");
        localStorage.removeItem(CART_STORAGE_KEY);
        return [];
    }
};
