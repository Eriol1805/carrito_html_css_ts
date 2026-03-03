import type {CartItem, Product} from "../types/index.js";

export const addToCart = (cart: CartItem[], product: Product): CartItem[] => {
	const itemExist = cart.find((item) => item.id === product.id);

	if (itemExist) {
		return cart.map((item) =>
			item.id === product.id
				? {...item, quantity: item.quantity + 1}
				: item,
		);
	} else {
        const newItem: CartItem = {...product, quantity: 1};
		return [...cart, newItem];
	}
};
