import { uiElements } from "../selectors.js";

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
