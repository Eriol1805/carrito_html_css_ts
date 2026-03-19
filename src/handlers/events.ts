import {products} from "../data/products.js";
import type {CartItem} from "../types/index.js";
import {addToCart, increaseQuantity, decreaseQuantity, destroyItem, getCartTotal} from "../logic/cart.js";
import {loadCartFromStorage, saveCartToStorage} from "../logic/storage.js";
import {showAlerts, renderCart} from "../ui/globals.js";
import {updateCartBadge, toggleCart} from "../ui/cart.js";

let myCart: CartItem[] = loadCartFromStorage();

export const initCartState = () => {
	renderCart(myCart);
	updateCartBadge();
};

export const setupAppListeners = () => {
	document.addEventListener("click", (e: MouseEvent) => {
		const target = e.target as HTMLElement;

		const addBtn = target.closest(".add-btn");

		if (addBtn) {
			const id = Number((addBtn as HTMLDataElement).dataset.id);
			if (isNaN(id)) return;

			const product = products.find((p) => p.id === id);

			if (product) {
				myCart = addToCart(myCart, product);
				saveCartToStorage(myCart);
				renderCart(myCart);
				updateCartBadge();
				showAlerts("Product added successfully", "success");
			}
		}

		const rowCart = target.closest(".row-cart");

		if (rowCart) {
			const productId = Number((rowCart as HTMLElement).dataset.id);
			if (isNaN(productId)) return;

			if (target.closest(".btn-plus")) {
				myCart = increaseQuantity(myCart, productId);
				saveCartToStorage(myCart);
				renderCart(myCart);
				updateCartBadge();
				return;
			}

			if (target.closest(".btn-minus")) {
				myCart = decreaseQuantity(myCart, productId);
				saveCartToStorage(myCart);
				renderCart(myCart);
				updateCartBadge();
				return;
			}

			if (target.closest(".btn-delete")) {
				myCart = destroyItem(myCart, productId);
				saveCartToStorage(myCart);
				showAlerts("Product successfully remove.", "success");
				renderCart(myCart);
				updateCartBadge();
				return;
			}
		}

		if (target.closest(".btn-empty")) {
			const confirmEmpty = confirm("Are you sure you want to empty the cart?");

			if (!confirmEmpty) return;
			myCart = [];
			saveCartToStorage(myCart);
			renderCart(myCart);
			updateCartBadge();
			showAlerts("Cart successfully empty.", "success");
			toggleCart(false);
			return;
		}
	});
};
