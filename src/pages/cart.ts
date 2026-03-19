import type {CartItem} from "../types/index.js";
import {uiElements} from "../selectors.js";
import {scapeHTML} from "../logic/security.js";
import {formatCurrency} from "../logic/format.js";
import {getCartTotal, getCartTotalItems, increaseQuantity, decreaseQuantity, destroyItem} from "../logic/cart.js";
import {loadCartFromStorage, saveCartToStorage} from "../logic/storage.js";
import {generateOrderCode, saveOrder} from "../logic/orderCode.js";

let cart: CartItem[] = loadCartFromStorage();

export const renderCartItems = (): void => {
    if (!uiElements.cartBox || !uiElements.cartFooter) return;

    uiElements.cartBox?.replaceChildren();

    if (cart.length === 0) {
        uiElements.cartBox!.innerHTML = '<tr><td colspan="5" class="empty-msg">Your cart is empty.</td></tr>';
        uiElements.cartFooter!.style.display = "none";
        updateTotalDisplay(0);
        return;
    }

    uiElements.cartFooter.style.display = "flex";

    cart.forEach((item) => {
        const totalItemPrice = item.price * item.quantity;

        const html = ` 
        <tr class="row-cart" data-id="${item.id}">
            <td>
                <img src="assets/images/products/${scapeHTML(item.image)}" alt="${scapeHTML(item.title)}">
                <span class="product-title">${scapeHTML(item.title)}</span>
            </td>
            <td>
                <div class="box-quantity">
                    <button title="btn-minus" type="button" class="btn-minus" ${item.quantity <= 1 ? "disabled" : ""}>
                        <i class="bx bx-minus"></i>
                    </button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button title="btn-plus" type="button" class="btn-plus" ${item.quantity >= 12 ? "disabled" : ""}>
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
        uiElements.cartBox!.insertAdjacentHTML("beforeend", html);
    });

    const total = getCartTotal(cart);
    updateTotalDisplay(total);
};

const updateTotalDisplay = (total: number): void => {
    const formattedTotal = formatCurrency(total);
    if (uiElements.totalPrice) {
        uiElements.totalPrice.textContent = formattedTotal;
    }
    const summaryTotal = document.querySelector<HTMLSpanElement>("#total-price-summary");
    if (summaryTotal) {
        summaryTotal.textContent = formattedTotal;
    }
};

export const updateCartBadge = (): void => {
    if (!uiElements.cartCount) return;

    const total = getCartTotalItems(cart);

    if (total > 0) {
        uiElements.cartCount.textContent = total.toString();
    } else {
        uiElements.cartCount.textContent = "0";
    }
};

export const redirectToCheckout = (): void => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const confirmBuy = confirm("Do you want to proceed to checkout?");
    if (!confirmBuy) return;

    const orderCode = generateOrderCode();
    const total = getCartTotal(cart);
    const orderData = {
        code: orderCode,
        items: [...cart],
        total,
        date: new Date().toISOString(),
    };

    saveOrder(orderData);

    window.location.href = "thankyou.html";
};

export const initCartPage = (): void => {
    renderCartItems();
    updateCartBadge();

    document.addEventListener("click", (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const rowCart = target.closest(".row-cart");

        if (rowCart) {
            const productId = Number((rowCart as HTMLElement).dataset.id);
            if (isNaN(productId)) return;

            if (target.closest(".btn-plus")) {
                cart = increaseQuantity(cart, productId);
                saveCartToStorage(cart);
                renderCartItems();
                updateCartBadge();
                return;
            }

            if (target.closest(".btn-minus")) {
                cart = decreaseQuantity(cart, productId);
                saveCartToStorage(cart);
                renderCartItems();
                updateCartBadge();
                return;
            }

            if (target.closest(".btn-delete")) {
                cart = destroyItem(cart, productId);
                saveCartToStorage(cart);
                renderCartItems();
                updateCartBadge();
                return;
            }
        }

        if (target.closest(".btn-empty")) {
            const confirmEmpty = confirm("Are you sure you want to empty the cart?");
            if (!confirmEmpty) return;
            cart = [];
            saveCartToStorage(cart);
            renderCartItems();
            updateCartBadge();
            return;
        }

        if (target.closest(".btn-checkout")) {
            redirectToCheckout();
        }
    });

    const continueShoppingBtn = document.querySelector<HTMLAnchorElement>(".btn-continue");
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener("click", (e) => {
            if (cart.length === 0) {
                e.preventDefault();
                alert("Your cart is empty!");
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initCartPage();
});
