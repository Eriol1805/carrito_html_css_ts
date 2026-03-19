const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateOrderCode = (): string => {
    const date = new Date();
    const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    
    let randomPart = "";
    for (let i = 0; i < 4; i++) {
        randomPart += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    
    return `ORD-${datePart}-${randomPart}`;
};

export interface OrderData {
    code: string;
    items: import("../types/index.js").CartItem[];
    total: number;
    date: string;
}

const ORDER_STORAGE_KEY = "last_order";

export const saveOrder = (order: OrderData): void => {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
};

export const loadLastOrder = (): OrderData | null => {
    try {
        const order = localStorage.getItem(ORDER_STORAGE_KEY);
        return order ? JSON.parse(order) : null;
    } catch {
        return null;
    }
};

export const clearOrder = (): void => {
    localStorage.removeItem(ORDER_STORAGE_KEY);
};
