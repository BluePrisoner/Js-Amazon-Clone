export let orders = [JSON.parse(localStorage.getItem('orders'))] || [];






/* if (typeof orders ==='object') {
    orders = [orders];
} */

/* || [{
    id: "e31cf2bf-8a6a-43b3-95cc-c0965da85764",
    orderTime: "2024-08-24T12:47:18.035Z",
    totalCostCents: 3504,
    products: [
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            estimatedDeliveryTime: "2024-08-31T12:47:18.035Z",
            variation: null
        },
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            estimatedDeliveryTime: "2024-08-31T12:47:18.035Z",
            variation: null
        }
    ]
}]; */


export function addOrders(order){

    orders.push(order);
    localStorage.setItem('orders',JSON.stringify(order));
    localStorage.removeItem('cart');
}
