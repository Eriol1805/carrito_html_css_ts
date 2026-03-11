import {uiElements} from "../selectors.js";
import type {CartItem} from "../types/index.js";
import {scapeHTML} from "../logic/security.js";
import {formatCurrency} from "../logic/format.js";
import { setupAppListeners } from "../handlers/events.js";

export const toggleCart = (show: boolean) => {
	if (!uiElements.cart) return;

	if (show) {
		uiElements.cart.classList.add("show");
	} else {
		uiElements.cart.classList.remove("show");
	}
};

export const initCartInteraction = () => {
	if (!uiElements.btnOpen || !uiElements.cart) return;

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

export const renderCart = (cartItems: CartItem[]) => {
	if (!uiElements.cartBox || !uiElements.cartFooter) return;

	uiElements.cartBox?.replaceChildren();

	if (cartItems.length === 0) {
		uiElements.cartBox.innerHTML =
			'<tr><td colspan="5" class="empty-msg">Your cart is empty.</td></tr>';
		uiElements.cartFooter.style.display = "none";
		return;
	}

	uiElements.cartFooter.style.display = 'flex';

	cartItems.forEach((item) => {
		const totalItemPrice = item.price * item.quantity;

		const html = ` 
		<tr class="row-cart" data-id="${item.id}">
            <td>
            	<img src="assets/images/products/${scapeHTML(item.image)}" alt="Image product">
            	<span class="product-title">${scapeHTML(item.title)}</span>
            </td>
            <td>
            	<div class="box-quantity">
                <button title="btn-minus" type="button" class="btn-minus">
                	<i class="bx bx-minus"></i>
                </button>
                <span class="item-quantity">${item.quantity}</span>
                <button title="btn-plus" type="button" class="btn-plus">
                	<i class="bx bx-plus"></i>
                </button>
            	</div>
            </td>
            <td class="product-price">${formatCurrency(totalItemPrice)}</td>
            <td>
            	<button title="btn-delete" type="button" class="btn-delete">
                <i class="bx bx-x"></i>
            	</button>
            </td>
        </tr>
		`;
		uiElements.cartBox?.insertAdjacentHTML("beforeend", html);
	});
};
