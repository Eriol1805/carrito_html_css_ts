import { uiElements } from "../selectors.js";
import { scapeHTML } from "../logic/security.js";
import { formatCurrency } from "../logic/format.js";
export const renderProductList = (products) => {
    if (!uiElements.container)
        return;
    uiElements.container.replaceChildren();
    products.forEach((product) => {
        const html = `
        <div class="product">
            <img src="assets/images/products/${scapeHTML(product.image)}" alt="Image Product">
            <div class="product-info">
            <div class="product-star">
                <i class="bxf bx-star"></i>
                <i class="bxf bx-star"></i>
                <i class="bxf bx-star"></i>
                <i class="bxf bx-star"></i>
                <i class="bxf bx-star-half"></i>
            </div>
            <h3>${scapeHTML(product.title)}</h3>
            <p>${scapeHTML(product.description)}</p>
            <div class="product-price">
                <span>${formatCurrency(product.previousPrice)}</span>
                <p>${formatCurrency(product.price)}</p>
            </div>
            <button type="button" class="add-btn" data-id="${product.id}">Add Cart</button>
            </div>
        </div> <!-- .product-->
        `;
        uiElements.container?.insertAdjacentHTML("beforeend", html);
    });
};
