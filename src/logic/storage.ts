import type {CartItem} from "../types/index.js";

const CART_STORAGE_KEY = 'shopping_cart';

export const saveCartToStorage = (cart: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const loadCartFromStorage = (): CartItem[] => {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
};