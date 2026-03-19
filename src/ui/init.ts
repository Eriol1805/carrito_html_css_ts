import { renderProductList } from "./products.js";
import { products } from "../data/products.js";
import { renderCurrentDate } from "./globals.js";
import { initCartInteraction } from "./cart.js";

export const initUI = () => {
    initCartInteraction();
    renderProductList(products);
    renderCurrentDate();
}
