import {products} from "../data/products.js";
import type {CartItem} from "../types/index.js";
import {addToCart, increaseQuantity, decreaseQuantity, destroyItem} from "../logic/cart.js";
import {renderCart} from "../ui/cart.js";
import {showAlerts} from "../ui/globals.js";

let myCart: CartItem[] = [];

export const initCartState = () => {
	renderCart(myCart);
};

export const setupAppListeners = () => {
	document.addEventListener("click", (e: MouseEvent) => {
		const target = e.target as HTMLElement;

		const addBtn = target.closest(".add-btn");

		if (addBtn) {
			const id = Number((addBtn as HTMLDataElement).dataset.id);
			const product = products.find((p) => p.id === id);

			if (product) {
				myCart = addToCart(myCart, product);

				renderCart(myCart);
				showAlerts("Product added successfully", "success");
			}
		}

		const rowCart = target.closest(".row-cart");

		if (!rowCart) return;

		const productId = Number((rowCart as HTMLElement).dataset.id);

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
			showAlerts('Product successfully remove.', 'success');
			renderCart(myCart);
			return;		
		}

	});
};

