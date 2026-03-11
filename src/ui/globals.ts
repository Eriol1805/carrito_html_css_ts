import { uiElements } from "../selectors.js";

export const renderCurrentDate = () => {
    const year = new Date().getFullYear();

    if(!uiElements.currentDate) return;
    uiElements.currentDate.textContent = year.toString();
}

export const showAlerts = (message: string, type: string) => {
    // Evitamos que se dupliquen las alertas
    const currentAlert = document.querySelector<HTMLDivElement>('.alert');
    if (currentAlert) currentAlert.remove();

    const div = document.createElement('div');
    div.textContent = message;
    div.classList.add('alert', type);

    div.addEventListener('animationend', () => {
        div.remove();
    })

    document.body.appendChild(div);
}