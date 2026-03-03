import { initHandlers } from "./handlers/init.js";
import { initUI } from "./ui/init.js";
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    initHandlers();
});
