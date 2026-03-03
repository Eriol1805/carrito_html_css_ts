import { initCartInteraction } from "./cart.js";
import { renderProductList } from "./products.js";
import { products } from "../data/products.js";
export const initUI = () => {
    initCartInteraction();
    renderProductList(products);
};
