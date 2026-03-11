import {products} from "../data/products.js";
import type {CartItem} from "../types/index.js";
import { addToCart } from "../logic/cart.js";
import { renderCart } from "../ui/cart.js";
import { showAlerts } from "../ui/globals.js";

let myCart: CartItem[] = [];

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
				showAlerts('Product added successfully', 'success');
			}
		}
	});
};
