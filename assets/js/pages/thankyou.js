import { loadLastOrder } from "../logic/orderCode.js";
import { scapeHTML } from "../logic/security.js";
import { formatCurrency } from "../logic/format.js";
import { generateWhatsAppLink } from "../logic/whatsapp.js";
export const renderThankYouPage = () => {
    const order = loadLastOrder();
    const orderCodeEl = document.querySelector("#order-code");
    const orderDateEl = document.querySelector("#order-date");
    const orderItemsEl = document.querySelector("#order-items");
    const orderTotalEl = document.querySelector("#order-total");
    const whatsappBtn = document.querySelector("#btn-whatsapp");
    const continueBtn = document.querySelector("#btn-continue");
    if (!order) {
        document.body.innerHTML = `
            <div class="thankyou-container">
                <div class="thankyou-content">
                    <i class="bx bx-error-circle"></i>
                    <h1>No order found</h1>
                    <p>Your order information could not be found.</p>
                    <a href="index.html" class="btn-primary">Go to Store</a>
                </div>
            </div>
        `;
        return;
    }
    if (orderCodeEl)
        orderCodeEl.textContent = order.code;
    if (orderDateEl) {
        const date = new Date(order.date);
        orderDateEl.textContent = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    if (orderItemsEl) {
        order.items.forEach((item) => {
            const itemHtml = `
                <div class="order-item">
                    <div class="order-item-info">
                        <img src="assets/images/products/${scapeHTML(item.image)}" alt="${scapeHTML(item.title)}">
                        <div>
                            <h4>${scapeHTML(item.title)}</h4>
                            <p>Qty: ${item.quantity} × ${formatCurrency(item.price)}</p>
                        </div>
                    </div>
                    <span class="order-item-total">${formatCurrency(item.price * item.quantity)}</span>
                </div>
            `;
            orderItemsEl.insertAdjacentHTML("beforeend", itemHtml);
        });
    }
    if (orderTotalEl)
        orderTotalEl.textContent = formatCurrency(order.total);
    if (whatsappBtn) {
        whatsappBtn.href = generateWhatsAppLink(order.items);
    }
    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
};
document.addEventListener("DOMContentLoaded", () => {
    renderThankYouPage();
});
