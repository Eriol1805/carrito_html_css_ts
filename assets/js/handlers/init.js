import { initCartState, setupAppListeners } from "./events.js";
export const initHandlers = () => {
    initCartState();
    setupAppListeners();
};
