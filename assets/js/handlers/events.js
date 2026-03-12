import { products } from "../data/products.js";
import { addToCart, increaseQuantity, decreaseQuantity, destroyItem, } from "../logic/cart.js";
import { renderCart, toggleCart } from "../ui/cart.js";
import { showAlerts } from "../ui/globals.js";
let myCart = [];
export const initCartState = () => {
    renderCart(myCart);
};
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
                showAlerts("Product added successfully", "success");
            }
        }
        const rowCart = target.closest(".row-cart");
        if (rowCart) {
            const productId = Number(rowCart.dataset.id);
            if (target.closest(".btn-plus")) {
                myCart = increaseQuantity(myCart, productId);
                renderCart(myCart);
                return;
            }
            if (target.closest(".btn-minus")) {
                myCart = decreaseQuantity(myCart, productId);
                renderCart(myCart);
                return;
            }
            if (target.closest(".btn-delete")) {
                myCart = destroyItem(myCart, productId);
                showAlerts("Product successfully remove.", "success");
                renderCart(myCart);
                return;
            }
        }
        ;
        if (target.closest(".btn-empty")) {
            const comfirmEmpty = confirm("Are you sure you want to empty the cart?");
            if (!comfirmEmpty)
                return;
            myCart = [];
            renderCart(myCart);
            showAlerts("Cart successfully empty.", "success");
            toggleCart(false);
            return;
        }
    });
};
