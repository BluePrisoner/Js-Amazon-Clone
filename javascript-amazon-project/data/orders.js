export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order){
    saveToStorage(order);
}

function saveToStorage(order){
    localStorage.setItem('orders',JSON.stringify(order));
}