import { initCartInteraction } from "./cart.js"
import { renderProductList } from "./products.js";
import { products } from "../data/products.js";
import { renderCurrentDate } from "./globals.js";

export const initUI = () => {
    initCartInteraction();
    renderProductList(products);
    renderCurrentDate();
}