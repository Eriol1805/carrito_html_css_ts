import { uiElements } from "../selectors.js";
import { loadCartFromStorage } from "../logic/storage.js";
import { getCartTotalItems } from "../logic/cart.js";
export const toggleCart = (show) => {
    if (!uiElements.cart)
        return;
    if (show) {
        uiElements.cart.classList.add("show");
    }
    else {
        uiElements.cart.classList.remove("show");
    }
};
export const initCartInteraction = () => {
    if (!uiElements.btnOpen || !uiElements.cart)
        return;
    uiElements.btnOpen.addEventListener("click", () => {
        toggleCart(true);
    });
    if (uiElements.btnClose) {
        uiElements.btnClose.addEventListener("click", () => {
            toggleCart(false);
        });
    }
    window.addEventListener("scroll", () => {
        if (uiElements.cart && uiElements.cart.classList.contains("show")) {
            toggleCart(false);
        }
    });
};
export const updateCartBadge = () => {
    if (!uiElements.cartCount)
        return;
    const cart = loadCartFromStorage();
    const total = getCartTotalItems(cart);
    if (total > 0) {
        uiElements.cartCount.textContent = total.toString();
    }
    else {
        uiElements.cartCount.textContent = "0";
    }
};
