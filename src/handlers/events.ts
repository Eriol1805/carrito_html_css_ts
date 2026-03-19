import {products} from "../data/products.js";
import type {CartItem} from "../types/index.js";
import {
	addToCart,
	increaseQuantity,
	decreaseQuantity,
	destroyItem,
} from "../logic/cart.js";
import {renderCart, toggleCart} from "../ui/cart.js";
import {showAlerts} from "../ui/globals.js";
import { loadCartFromStorage, saveCartToStorage } from "../logic/storage.js";
import { generateWhatsAppLink } from "../logic/whatsapp.js";

let myCart: CartItem[] = loadCartFromStorage();

export const initCartState = () => {
	renderCart(myCart);
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
				renderCart(myCart);
				saveCartToStorage(myCart);
				showAlerts("Product added successfully", "success");
			}
		}

		const rowCart = target.closest(".row-cart");

		if (rowCart) {
			const productId = Number((rowCart as HTMLElement).dataset.id);

			if (target.closest(".btn-plus")) {
				myCart = increaseQuantity(myCart, productId);
				saveCartToStorage(myCart);
				renderCart(myCart);
				return;
			}

			if (target.closest(".btn-minus")) {
				myCart = decreaseQuantity(myCart, productId);
				saveCartToStorage(myCart);
				renderCart(myCart);
				return;
			}

			if (target.closest(".btn-delete")) {
				myCart = destroyItem(myCart, productId);
				saveCartToStorage(myCart);
				showAlerts("Product successfully remove.", "success");
				renderCart(myCart);
				return;
			}
		};

		if (target.closest(".btn-empty")) {
			const confirmEmpty = confirm("Are you sure you want to empty the cart?");

			if (!confirmEmpty) return;
			myCart = [];
			saveCartToStorage(myCart);
			renderCart(myCart);
			showAlerts("Cart successfully empty.", "success");
			toggleCart(false);
			return;
		}

		if (target.closest(".btn-buy")) {
			const confirmBuy = confirm("Are you sure you want to buy these products?");

			if (!confirmBuy) return;

			const link = generateWhatsAppLink(myCart);
			window.open(link, "_blank");

			myCart = [];
			saveCartToStorage(myCart);
			renderCart(myCart);
			showAlerts("Thank you for your purchase!", "success");
			toggleCart(false);
		}
	});
};
