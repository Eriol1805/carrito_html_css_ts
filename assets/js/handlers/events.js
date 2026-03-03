import { products } from "../data/products.js";
import { addToCart } from "../logic/cart.js";
import { renderCart } from "../ui/cart.js";
let myCart = [];
export const setupAppListeners = () => {
    document.addEventListener("click", (e) => {
        const target = e.target;
        const addBtn = target.closest(".add-btn");
        if (addBtn) {
            const id = Number(addBtn.dataset.id);
            const product = products.find((p) => p.id === id);
            if (product) {
                myCart = addToCart(myCart, product);
                renderCart(myCart);
            }
        }
    });
};
