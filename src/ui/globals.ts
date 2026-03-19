import { uiElements } from "../selectors.js";
import type {CartItem} from "../types/index.js";
import {scapeHTML} from "../logic/security.js";
import {formatCurrency} from "../logic/format.js";
import {getCartTotal} from "../logic/cart.js";

export const renderCart = (cartItems: CartItem[]): void => {
	if (!uiElements.cartBox || !uiElements.cartFooter) return;

	uiElements.cartBox.replaceChildren();

	if (cartItems.length === 0) {
		uiElements.cartBox.innerHTML = '<tr><td colspan="5" class="empty-msg">Your cart is empty.</td></tr>';
		uiElements.cartFooter.style.display = "none";
		updateTotalDisplay(0);
		return;
	}

	uiElements.cartFooter.style.display = "flex";

	cartItems.forEach((item) => {
		const totalItemPrice = item.price * item.quantity;

		const html = ` 
		<tr class="row-cart" data-id="${item.id}">
			<td>
				<img src="assets/images/products/${scapeHTML(item.image)}" alt="${scapeHTML(item.title)}">
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

	const total = getCartTotal(cartItems);
	updateTotalDisplay(total);
};

const updateTotalDisplay = (total: number): void => {
	if (uiElements.totalPrice) {
		uiElements.totalPrice.textContent = formatCurrency(total);
	}
};

export const renderCurrentDate = () => {
    const year = new Date().getFullYear();

    if(!uiElements.currentDate) return;
    uiElements.currentDate.textContent = year.toString();
}

export const showAlerts = (message: string, type: string) => {
    const currentAlert = document.querySelector<HTMLDivElement>('.alert');
    if (currentAlert) currentAlert.remove();

    const div = document.createElement('div');
    div.textContent = message;
    div.classList.add('alert', type);

    div.addEventListener('animationend', () => {
        div.remove();
    })

    document.body.appendChild(div);
}
