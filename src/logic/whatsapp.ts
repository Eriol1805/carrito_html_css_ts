import type {CartItem} from "../types/index.js";
import { getCartTotal } from "./cart.js";
import { formatCurrency } from "./format.js";

const WHATSAPP_CONFIG = {
    phoneNumber: "2364326229",
} as const;

export const generateWhatsAppLink = (cart: CartItem[]): string => {
	const phoneNumber = WHATSAPP_CONFIG.phoneNumber;
	const baseUrl = window.location.origin;

	let message = `Hello! I would like to place an order from your store. Here are the details:\n\n`;

	cart.forEach((item) => {
		const imageUrl = `${baseUrl}/carrito_html_css_ts/assets/images/products/${item.image}`;
		message += `Product: ${item.title}\n`;
        message += `Price: $${formatCurrency(item.price)}\n`;
        message += `Quantity: ${item.quantity}\n`;
        message += `ViewImage: ${imageUrl}\n`;
        message += `Subtotal: $${formatCurrency(item.price * item.quantity)}\n`;
	});

    const total = getCartTotal(cart);

	message += `\nTotal: $${formatCurrency(total)}\n`
    message += `\nPlease let me know how to proceed with the payment and delivery. Thank you!`;
	const encodedMessage = encodeURIComponent(message);

	return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
