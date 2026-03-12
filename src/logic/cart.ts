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

export const increaseQuantity = (cart: CartItem[], id: CartItem["id"]) => {
	return cart.map((item) =>
		item.id === id && item.quantity < 12
			? {...item, quantity: item.quantity + 1}
			: item,
	);
};

export const decreaseQuantity = (cart: CartItem[], id: CartItem["id"]) => {
	return cart.map((item) =>
		item.id === id && item.quantity > 1
			? {...item, quantity: item.quantity - 1}
			: item,
	);
};

export const destroyItem = (
	cart: CartItem[],
	id: CartItem["id"],
): CartItem[] => {
	return cart.filter(item => item.id !== id);
};

export const getCartTotal = (cart: CartItem[]): number => {
	return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartTotalItems = (cart: CartItem[]): number => {
	return cart.reduce((total, item) => total + item.quantity, 0);
};
